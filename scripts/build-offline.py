from pathlib import Path
import json
import re

root = Path(__file__).resolve().parent.parent
docs = root / 'docs'
raw = (docs / 'data.js').read_text()
data = json.loads(re.sub(r'^window\.PHRASALS\s*=\s*', '', raw).strip().removesuffix(';'))
assert len(data) == len({c['phrase'] for c in data}) == 200
assert [c['id'] for c in data] == [f'p{i:03}' for i in range(1, 201)]
manifest = json.loads((docs / 'audio/manifest.json').read_text())
assert manifest['voice'] == 'en-GB-RyanNeural' and manifest['complete']
assert len(manifest['clips']) == 400 and not manifest['failures']
assert len(list((docs / 'audio').glob('p*.mp3'))) == 400
for card in data:
    for suffix in ['', '-example']:
        assert (docs / 'audio' / (card['id'] + suffix + '.mp3')).is_file()
assets = ['./' + str(f.relative_to(docs)) for f in sorted(docs.rglob('*'))
          if f.is_file() and f.name not in ['.nojekyll', 'sw.js', '.DS_Store']]
template = (root / 'scripts/sw-template.js').read_text()
(docs / 'sw.js').write_text(template.replace('__ASSETS__', json.dumps(assets, ensure_ascii=False, indent=2)))
print(json.dumps({'assets': len(assets), 'bytes': sum((docs / a[2:]).stat().st_size for a in assets)}))
