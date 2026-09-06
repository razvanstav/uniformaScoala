from pathlib import Path
import json
from PIL import Image

root = Path(__file__).parent
assets = json.loads((root / "assets-manifest.json").read_text(encoding="utf-8"))
lines = ["# Illustrative photography placeholders", "", "These AI-generated photographs are illustrative placeholders, not actual MEAI inventory or actual brand photography.", "", "Generated with the built-in ImageGen tool. Exactly one generation request per image; seven requests total, no retries or variants. Original PNGs remain in their generated-images directory. Processing below only converts to JPEG and resizes, without cropping or image editing.", ""]
for asset in assets:
    target = root / asset["output"]
    with Image.open(asset["source"]) as original:
        source_size = original.size
        converted = original.convert("RGB").resize(tuple(asset["dimensions"]), Image.Resampling.LANCZOS)
        converted.save(target, "JPEG", quality=92, optimize=True, progressive=True)
    with Image.open(target) as check:
        check.verify()
    with Image.open(target) as check:
        assert check.size == tuple(asset["dimensions"])
        assert check.format == "JPEG"
    lines.extend(["## " + asset["output"], "", "- Output: " + str(target), "- Output dimensions: " + str(asset["dimensions"][0]) + " x " + str(asset["dimensions"][1]), "- Original: " + asset["source"], "- Original dimensions: " + str(source_size[0]) + " x " + str(source_size[1]), "", "### Exact prompt", "", asset["prompt"], ""])
    print(f"{target} | {asset['dimensions'][0]}x{asset['dimensions'][1]} | {target.stat().st_size} bytes | original {source_size[0]}x{source_size[1]}")
(root / "prompts.md").write_text("\n".join(lines), encoding="utf-8")

