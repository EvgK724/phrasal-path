#!/usr/bin/env python3
"""Generate verified English audio with Microsoft's exact en-GB-RyanNeural voice.

Accepts a JSON word array, {"words": [...]}, or a JSON-compatible
window.HUMAN_DATA = {...}; file. It never evaluates JavaScript.
"""

from __future__ import annotations

import argparse
import asyncio
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from mutagen import MutagenError

VOICE = "en-GB-RyanNeural"
SAMPLE_TEXT = "Phrasal verbs. Find out. Carry on."
ROOT = Path(__file__).resolve().parent.parent


def read_words(path: Path) -> list[dict]:
    raw = path.read_text(encoding="utf-8-sig").strip()
    prefix = re.match(r"^(?:window\.)?HUMAN_DATA\s*=\s*", raw)
    if prefix:
        raw = raw[prefix.end():].rstrip().removesuffix(";").rstrip()
    payload = json.loads(raw)
    words = payload.get("words") if isinstance(payload, dict) else payload
    if not isinstance(words, list) or not words:
        raise ValueError("Input must contain a nonempty words array.")
    seen = set()
    clean = []
    for number, word in enumerate(words, 1):
        if not isinstance(word, dict):
            raise ValueError(f"Word {number} must be an object.")
        word_id = word.get("id")
        if not isinstance(word_id, str) or not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9_-]{0,79}", word_id):
            raise ValueError(f"Word {number} needs a safe unique string id.")
        if word_id in seen:
            raise ValueError(f"Duplicate word id: {word_id}")
        seen.add(word_id)
        if not isinstance(word.get("en"), str) or not word["en"].strip():
            raise ValueError(f"Word {word_id} needs a nonempty en field.")
        example = word.get("example") or ""
        if not isinstance(example, str):
            raise ValueError(f"Example for {word_id} must be plain text.")
        clean.append({"id": word_id, "en": word["en"].strip(), "example": example.strip()})
    # Avoid collisions between an id and another word's generated example path.
    names = [w["id"] + suffix for w in clean for suffix in (["", "-example"] if w["example"] else [""])]
    if len(names) != len(set(names)):
        raise ValueError("Word ids conflict with generated -example filenames.")
    return clean


def probe(path: Path) -> dict:
    from mutagen.mp3 import MP3
    import imageio_ffmpeg
    metadata = MP3(path).info
    if metadata.length <= 0 or path.stat().st_size == 0:
        raise ValueError(f"Generated file is not a playable MP3: {path.name}")
    # Decode the complete clip, so a valid header alone is not considered proof.
    subprocess.run(
        [imageio_ffmpeg.get_ffmpeg_exe(), "-v", "error", "-xerror", "-i", str(path), "-f", "null", "-"],
        capture_output=True, text=True, timeout=30, check=True,
    )
    return {"duration": round(metadata.length, 6), "bytes": path.stat().st_size,
            "sampleRate": metadata.sample_rate, "channels": metadata.channels,
            "bitrate": metadata.bitrate, "audioSha256": hashlib.sha256(path.read_bytes()).hexdigest(),
            "validation": "mutagen-mp3-header-and-full-ffmpeg-decode"}


def atomic_json(path: Path, data: dict) -> None:
    temporary = path.with_name(path.name + ".tmp")
    temporary.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temporary.replace(path)


def configure_tts():
    try:
        import edge_tts
        import edge_tts.communicate
        import edge_tts.voices
    except ImportError as exc:
        raise RuntimeError("Install dependencies: python -m pip install -r scripts/audio-requirements.txt") from exc
    # edge-tts uses certifi explicitly. Add the managed environment's CA trust
    # without disabling certificate verification or changing its proxy policy.
    ca = os.environ.get("SSL_CERT_FILE") or os.environ.get("REQUESTS_CA_BUNDLE")
    if ca:
        for module in (edge_tts.voices, edge_tts.communicate):
            module._SSL_CTX.load_verify_locations(cafile=ca)
    return edge_tts


async def run(args) -> None:
    words = [{"id": "ryan-sample", "en": SAMPLE_TEXT, "example": ""}] if args.sample else read_words(args.data)
    edge_tts = configure_tts()
    proxy = os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy") or os.environ.get("HTTP_PROXY") or os.environ.get("http_proxy")
    voices = await asyncio.wait_for(edge_tts.list_voices(proxy=proxy), timeout=45)
    voice = next((v for v in voices if v.get("ShortName") == VOICE), None)
    if not voice:
        raise RuntimeError(f"Microsoft did not list {VOICE}; no substitute voice will be used.")
    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=True)
    manifest_path = output / ("sample-manifest.json" if args.sample else "manifest.json")
    previous = {}
    if manifest_path.exists():
        old = json.loads(manifest_path.read_text(encoding="utf-8"))
        if old.get("voice") == VOICE and old.get("rate") == args.rate:
            previous = {x["file"]: x for x in old.get("clips", [])}
    clips, failed = [], []
    semaphore = asyncio.Semaphore(args.concurrency)
    expected_clips = sum(1 + bool(w["example"]) for w in words)

    def checkpoint(complete=False):
        manifest = {
            "schemaVersion": 2, "voice": VOICE, "voiceMetadata": voice, "rate": args.rate,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "source": "sample-only" if args.sample else args.data.name,
            "complete": complete and not failed and len(clips) == expected_clips,
            "expectedClips": expected_clips,
            "clips": sorted(clips, key=lambda c: (c["id"], c["kind"])), "failures": failed,
        }
        atomic_json(manifest_path, manifest)

    checkpoint()

    async def make(word, kind, text):
        name = word["id"] + ("-example" if kind == "example" else "") + ".mp3"
        target = output / name
        digest = hashlib.sha256(text.encode("utf-8")).hexdigest()
        async with semaphore:
            old = previous.get(name, {})
            if not args.force and old.get("textSha256") == digest and old.get("status") == "ready" and target.exists():
                try:
                    metadata = await asyncio.to_thread(probe, target)
                    if old.get("audioSha256") and old["audioSha256"] != metadata["audioSha256"]:
                        raise ValueError("Cached audio hash mismatch")
                    clips.append({**old, **metadata})
                    checkpoint()
                    print(f"Cached: {name}", flush=True)
                    return
                except (ValueError, KeyError, subprocess.SubprocessError, OSError, MutagenError):
                    pass
            for attempt in range(3):
                fd, filename = tempfile.mkstemp(prefix=".ryan-", suffix=".part", dir=output)
                os.close(fd)
                temporary = Path(filename)
                try:
                    speaker = edge_tts.Communicate(text, voice=VOICE, rate=args.rate, proxy=proxy)
                    await asyncio.wait_for(speaker.save(str(temporary)), timeout=90)
                    metadata = await asyncio.to_thread(probe, temporary)
                    temporary.replace(target)
                    clips.append({"id": word["id"], "kind": kind, "text": text, "file": name, "url": "audio/" + name, "textSha256": digest, "status": "ready", **metadata})
                    checkpoint()
                    print(f"Ready: {name} ({metadata['duration']:.3f}s)", flush=True)
                    return
                except Exception as exc:
                    temporary.unlink(missing_ok=True)
                    if attempt == 2:
                        # Exclude any stale file from the authoritative manifest.
                        failed.append({"id": word["id"], "kind": kind, "file": name, "status": "failed", "error": type(exc).__name__})
                        checkpoint()
                        print(f"Failed: {name} ({type(exc).__name__})", file=sys.stderr, flush=True)
                    else:
                        await asyncio.sleep(attempt + 1)

    await asyncio.gather(*(make(w, kind, text) for w in words for kind, text in [("word", w["en"]), ("example", w["example"])] if text))
    checkpoint(complete=True)
    print(json.dumps({"voice": VOICE, "ready": len(clips), "failed": len(failed), "manifest": str(manifest_path)}), flush=True)
    if failed:
        raise RuntimeError(f"{len(failed)} clip(s) failed; inspect the manifest. No voice substitutions were made.")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--data", type=Path, help="JSON or window.HUMAN_DATA file containing the final supplied words")
    source.add_argument("--sample", action="store_true", help="Generate only the explicitly labelled Ryan sample")
    parser.add_argument("--output", type=Path, default=ROOT / "docs" / "audio")
    parser.add_argument("--rate", default="+0%", help="Speech rate, e.g. --rate=-10%%")
    parser.add_argument("--concurrency", type=int, default=2, choices=range(1, 5))
    parser.add_argument("--force", action="store_true", help="Regenerate even when matching validated audio exists")
    args = parser.parse_args()
    try:
        asyncio.run(run(args))
        return 0
    except Exception as exc:
        # Response URLs may include access tokens: do not dump exception bodies.
        safe_message = str(exc) if isinstance(exc, (ValueError, RuntimeError, FileNotFoundError)) else type(exc).__name__
        print(f"Audio generation stopped: {safe_message}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
