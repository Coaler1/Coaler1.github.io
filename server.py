from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from urllib.request import urlopen
import json


ROOT = Path(__file__).resolve().parent
CACHE_FILE = ROOT / "review-users.json"


def read_cache():
    if not CACHE_FILE.exists():
        return {}

    try:
        return json.loads(CACHE_FILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def write_cache(cache):
    CACHE_FILE.write_text(json.dumps(cache, indent=2), encoding="utf-8")


def fetch_json(url):
    with urlopen(url, timeout=12) as response:
        return json.loads(response.read().decode("utf-8"))


def download_avatar(user_id, image_url):
    avatar_path = ROOT / f"review-avatar-{user_id}.png"

    if avatar_path.exists():
        return avatar_path.name

    with urlopen(image_url, timeout=12) as response:
        avatar_path.write_bytes(response.read())

    return avatar_path.name


def load_roblox_users(user_ids):
    cache = read_cache()
    missing_ids = [user_id for user_id in user_ids if user_id not in cache]

    for user_id in missing_ids:
        try:
            user = fetch_json(f"https://users.roblox.com/v1/users/{user_id}")
            cache[user_id] = {
                "name": user.get("name") or user.get("displayName") or f"Roblox User {user_id}",
                "username": user.get("name") or "",
                "avatar": "",
            }
        except Exception:
            cache[user_id] = {
                "name": f"Roblox User {user_id}",
                "username": "",
                "avatar": "",
            }

    users_needing_avatars = [user_id for user_id in user_ids if not cache.get(user_id, {}).get("avatar")]

    if users_needing_avatars:
        try:
            joined_ids = ",".join(users_needing_avatars)
            payload = fetch_json(
                "https://thumbnails.roblox.com/v1/users/avatar-headshot"
                f"?userIds={joined_ids}&size=150x150&format=Png&isCircular=true"
            )

            for item in payload.get("data", []):
                user_id = str(item.get("targetId"))
                image_url = item.get("imageUrl")

                if item.get("state") == "Completed" and image_url:
                    cache.setdefault(user_id, {})
                    cache[user_id]["avatar"] = download_avatar(user_id, image_url)
        except Exception:
            pass

    write_cache(cache)
    return {user_id: cache.get(user_id, {}) for user_id in user_ids}


class PortfolioHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)

        if parsed.path == "/api/roblox-users":
            params = parse_qs(parsed.query)
            raw_ids = params.get("ids", [""])[0].split(",")
            user_ids = [user_id.strip() for user_id in raw_ids if user_id.strip().isdigit()]
            users = load_roblox_users(user_ids)
            payload = json.dumps({"users": users}).encode("utf-8")

            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return

        super().do_GET()


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 8001), PortfolioHandler)
    print("Portfolio server running at http://127.0.0.1:8001/index.html")
    server.serve_forever()
