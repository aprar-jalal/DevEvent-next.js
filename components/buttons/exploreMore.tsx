"use client";

import posthog from "posthog-js";

const isPostHogConfigured = Boolean(
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
    process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

const ExploreMore = () => {
    const handleExploreMore = () => {
        if (isPostHogConfigured) {
            posthog.capture("featured_events_explored");
        }
    };
    return (
        <button
            type="button"
            id="explore-btn"
            className="mt-7 mx-auto black_btn "
            onClick={handleExploreMore}
        >
            <a href="#events">
                Explore More ↓
            </a>
        </button>
    );
};

export default ExploreMore;