# Offline Ryan audio

The teaching text is original. The generator requests exactly `en-GB-RyanNeural`; it refuses voice substitution.

Create a Python environment and install `audio-requirements.txt`, then run from the repository root:

```sh
python scripts/audio_generate.py --data scripts/audio-texts.json --output docs/audio --concurrency 4
```

The manifest is saved atomically after each clip and supports resuming. Every MP3 is checked with Mutagen and decoded completely by FFmpeg, with SHA-256 hashes for both source text and audio bytes. Successful existing clips are reused only when the text hash matches, the audio hash matches when recorded, and decoding succeeds. A failed clip is listed explicitly; `complete` is true only for all expected clips. No authentication credentials are written to the repository.
