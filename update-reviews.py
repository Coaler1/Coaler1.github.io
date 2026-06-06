from pathlib import Path
from urllib.request import urlopen
import json


ROOT = Path(__file__).resolve().parent
REVIEWS_FILE = ROOT / "reviews.json"
USERS_FILE = ROOT / "review-users.json"


def read_json(path, fallback):
    if not path.exists():
        return fallback

    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return fallback


def write_json(path, payload):
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")


def fetch_json(url):
    with urlopen(url, timeout=15) as response:
        return json.loads(response.read().decode("utf-8"))


def download_file(url, path):
    with urlopen(url, timeout=15) as response:
        path.write_bytes(response.read())


def get_review_user_ids():
    reviews = read_json(REVIEWS_FILE, [])
    user_ids = []

    for review in reviews:
        user_id = str(review.get("userId", "")).strip()

        if user_id.isdigit() and user_id not in user_ids:
            user_ids.append(user_id)

    return user_ids


def update_user_names(cache, user_ids):
    for user_id in user_ids:
        cache.setdefault(user_id, {})

        if cache[user_id].get("name") and cache[user_id].get("username"):
            continue

        user = fetch_json(f"https://users.roblox.com/v1/users/{user_id}")
        username = user.get("name") or ""
        display_name = user.get("displayName") or username or f"Roblox User {user_id}"

        cache[user_id]["name"] = username or display_name
        cache[user_id]["username"] = username


def update_user_avatars(cache, user_ids):
    missing_avatar_ids = [
        user_id
        for user_id in user_ids
        if not cache.get(user_id, {}).get("avatar")
        or not (ROOT / cache[user_id]["avatar"]).exists()
    ]

    if not missing_avatar_ids:
        return

    joined_ids = ",".join(missing_avatar_ids)
    payload = fetch_json(
        "https://thumbnails.roblox.com/v1/users/avatar-headshot"
        f"?userIds={joined_ids}&size=150x150&format=Png&isCircular=true"
    )

    for item in payload.get("data", []):
        user_id = str(item.get("targetId", ""))
        image_url = item.get("imageUrl")

        if item.get("state") != "Completed" or not user_id or not image_url:
            continue

        avatar_name = f"review-avatar-{user_id}.png"
        download_file(image_url, ROOT / avatar_name)
        cache.setdefault(user_id, {})
        cache[user_id]["avatar"] = avatar_name


def main():
    user_ids = get_review_user_ids()
    cache = read_json(USERS_FILE, {})

    update_user_names(cache, user_ids)
    update_user_avatars(cache, user_ids)
    write_json(USERS_FILE, cache)

    print(f"Updated {len(user_ids)} review user(s).")
    for user_id in user_ids:
        user = cache.get(user_id, {})
        print(f"- {user_id}: {user.get('name', 'Unknown')} / {user.get('avatar', 'no avatar')}")


if __name__ == "__main__":
    main()
