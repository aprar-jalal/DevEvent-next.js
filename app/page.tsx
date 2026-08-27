import EventCard from "@/components/Card/eventCard";
import ExploreMore from "./../components/buttons/exploreMore";
import { IEvent } from "@/models/Event";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
  "use cache";
  cacheLife('hours')
   const response = await fetch(`${BASE_URL}/api/events?limit=6`);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const events = await response.json();

  console.log("events:", events);

  return (
    <section className="w-full px-4 sm:px-8 mt-20">
      <h1 className="hero-title">
        The Hub For Every Dev <br />
        <span>Event You Can Not Miss</span>
      </h1>

      <p className="mt-5 text-center text-base text-gray-300 sm:text-lg">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>

      <ExploreMore />

      <div className="mx-auto mt-60 w-full max-w-7xl" id="events">
        <h3 className="mb-7 text-2xl font-bold text-white sm:text-3xl">
          Featured Events
        </h3>

        <ul className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
  {events.map((event: IEvent) => (
    <li key={event.slug} className="h-full w-full">
      <EventCard {...event} />
    </li>
  ))}
</ul>
      </div>
    </section>
  );
};

export default Page;