import { useEffect, useState } from "react";

const fallbackAvatar = (userId) =>
  `https://www.roblox.com/headshot-thumbnail/image?userId=${encodeURIComponent(userId)}&width=150&height=150&format=png`;

const clampStars = (stars) => Math.max(0, Math.min(5, Number(stars) || 0));

function renderStars(stars) {
  const rating = clampStars(stars);
  return `${"\u2605".repeat(rating)}${"\u2606".repeat(5 - rating)}`;
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState(null);
  const [users, setUsers] = useState({});

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      try {
        const response = await fetch("reviews.json");

        if (!response.ok) {
          throw new Error("reviews.json could not be loaded");
        }

        const loadedReviews = await response.json();
        const userIds = [...new Set(loadedReviews.map((review) => String(review.userId)).filter(Boolean))];
        const cachedUsersResponse = await fetch("review-users.json").catch(() => null);
        const cachedUsers = cachedUsersResponse?.ok ? await cachedUsersResponse.json() : {};

        if (isMounted) {
          setReviews(loadedReviews);
          setUsers(cachedUsers);
        }

        const isLocalPreview = ["127.0.0.1", "localhost"].includes(window.location.hostname);
        const apiResponse = isLocalPreview
          ? await fetch(`http://127.0.0.1:8001/api/roblox-users?ids=${encodeURIComponent(userIds.join(","))}`).catch(() => null)
          : null;

        if (isMounted && apiResponse?.ok) {
          const payload = await apiResponse.json();
          setUsers((currentUsers) => ({ ...currentUsers, ...(payload.users || {}) }));
        }
      } catch {
        if (isMounted) {
          setReviews([]);
        }
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="section reveal" id="reviews">
      <div className="section-head">
        <div>
          <div className="eyebrow-subtle">Client Feedback</div>
          <h2>Reviews</h2>
        </div>
      </div>

      <div className="reviews-grid">
        {reviews === null ? (
          <div className="review-card glass">
            <p className="review-text">Loading reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((review) => {
            const userId = String(review.userId);
            const user = users[userId] || {};
            const name = user.name || `Roblox User ${userId}`;
            const avatar = user.avatar || fallbackAvatar(userId);

            return (
              <article className="review-card glass" key={`${userId}-${review.text}`}>
                <div className="review-head">
                  <img className="review-avatar" src={avatar} alt={`${name} Roblox avatar`} />
                  <div>
                    <h3 className="review-name">{name}</h3>
                    <div className="review-stars" aria-label={`${clampStars(review.stars)} out of 5 stars`}>
                      {renderStars(review.stars)}
                    </div>
                  </div>
                </div>
                <p className="review-text">{review.text}</p>
              </article>
            );
          })
        ) : (
          <div className="review-card glass">
            <p className="review-text">No reviews added yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
