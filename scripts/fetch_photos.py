"""Fetch one free-licence lead photo per place from Wikipedia / Wikimedia Commons.

Writes public/photos/<slug>.jpg and lib/photos.json with the credit for each.
Only files whose licence is CC BY, CC BY-SA, CC0 or public domain are kept.
"""
import json, re, sys, time, html, urllib.error, urllib.parse, urllib.request, pathlib

UA = "IndiaByLocalPhotoFetch/0.1 (site build script)"
ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "photos"
OK = re.compile(r"^(cc[ -]by|cc0|public domain|pd|fal)", re.I)

def get(url, raw=False):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for attempt in range(6):
        try:
            with urllib.request.urlopen(req, timeout=40) as r:
                data = r.read()
            return data if raw else json.loads(data)
        except urllib.error.HTTPError as e:
            if e.code != 429 or attempt == 5: raise
            time.sleep(25 * (attempt + 1))

def api(host, **params):
    params.update(format="json", formatversion="2")
    return get(f"https://{host}/w/api.php?" + urllib.parse.urlencode(params))

def strip(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s or "")).strip()

places = json.loads((ROOT / "scripts" / "places.json").read_text())
only = set(sys.argv[1:])
credits_path = ROOT / "lib" / "photos.json"
credits = json.loads(credits_path.read_text()) if credits_path.exists() else {}
failed = []
for slug, _name, _state, _region, title in places:
    if only and slug not in only: continue
    if not only and slug in credits and (OUT / f"{slug}.jpg").exists(): continue
    try:
        q = api("en.wikipedia.org", action="query", titles=title, redirects="1",
                prop="pageimages", piprop="thumbnail|name", pithumbsize="1280", pilicense="free")
        page = q["query"]["pages"][0]
        fname, thumb = page["pageimage"], page["thumbnail"]
        if not fname.lower().endswith((".jpg", ".jpeg")): raise ValueError(f"not a photo: {fname}")
        info = api("commons.wikimedia.org", action="query", titles="File:" + fname,
                   prop="imageinfo", iiprop="extmetadata|url")["query"]["pages"][0]["imageinfo"][0]
        meta = info["extmetadata"]
        lic = strip(meta.get("LicenseShortName", {}).get("value"))
        if not OK.match(lic): raise ValueError(f"licence {lic!r}")
        (OUT / f"{slug}.jpg").write_bytes(get(thumb["source"], raw=True))
        credits[slug] = {"w": thumb["width"], "h": thumb["height"], "subject": page["title"],
                         "artist": strip(meta.get("Artist", {}).get("value"))[:80] or "Unknown",
                         "license": lic, "source": info["descriptionurl"]}
        print("ok  ", slug, fname, lic)
    except Exception as e:
        failed.append(slug); print("FAIL", slug, title, "-", e)
    time.sleep(3)
credits_path.write_text(json.dumps(dict(sorted(credits.items())), indent=1, ensure_ascii=False) + "\n")
print("failed:", " ".join(failed))
