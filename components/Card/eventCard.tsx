"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { FaLocationDot, FaCalendarDays, FaClock } from "react-icons/fa6";

const isPostHogConfigured = Boolean(
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
    process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

type Props = {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string;
};

const EventCard = ({
    title,
    image,
    slug,
    location,
    date,
    time,
}: Props) => {
    const handleEventSelection = () => {
        if (isPostHogConfigured) {
            posthog.capture("featured_event_selected", {
                event_slug: slug,
            });
        }
    };

    return (
     <Link
  href={`/events/${slug}`}
  className="card flex h-full w-full flex-col overflow-hidden rounded-xl"
  onClick={handleEventSelection}
>
            <Image
                src={image}
                alt={title}
                width={410}
                height={300}
                className="aspect-[410/300] h-auto w-full object-cover"
            />

            <div className="flex flex-1 flex-col p-4">
  <div className="flex items-center gap-2 text-xs font-light">
    <FaLocationDot className="text-gray-400" />
    <span>{location}</span>
  </div>

  <p className="title mt-2 mb-4 text-xl font-bold text-white">
    {title}
  </p>

  <div className="mt-auto flex flex-row gap-3 text-xs text-gray-400">
    <div className="flex items-center gap-2">
      <FaCalendarDays />
      <span>{date}</span>
    </div>

    <div className="flex items-center gap-2">
      <FaClock />
      <span>{time}</span>
    </div>
  </div>
</div>
        </Link>
    );
};

export default EventCard;