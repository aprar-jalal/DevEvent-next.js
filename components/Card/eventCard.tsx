import Image from "next/image";
import Link from "next/link";
import { FaLocationDot, FaCalendarDays, FaClock } from "react-icons/fa6";

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
    return (
        <Link
            href={`/events/${slug}`}
            id="event-card"
            className="card block w-full overflow-hidden rounded-xl"
        >
            <Image
                src={image}
                alt={title}
                width={410}
                height={300}
                className="h-auto w-full object-cover"
            />

            <div className="py-4">
                <div className="flex flex-row gap-2 items-center text-xs font-light">
                    <FaLocationDot className="text-gray-400 " />
                    <span>{location}</span>
                </div>
                <p className="title mb-4 text-xl font-bold text-white mt-2">
                    {title}
                </p>

                <div className="flex flex-row gap-3 text-xs text-gray-400">
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