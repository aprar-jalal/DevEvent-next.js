import EventCard from "@/components/Card/eventCard";
import ExploreMore from "./../components/buttons/exploreMore";

const events = [
  {
    image: "/assets/images/event.webp",
    title: "Event 1",
    slug: "event-1",
    location: "Location 1",
    date: "Date 1",
    time: "Time 1",
  },
  {
    image: "/assets/images/event.webp",
    title: "Event 2",
    slug: "event-2",
    location: "Location 2",
    date: "Date 2",
    time: "Time 2",
  },
  {
    image: "/assets/images/event.webp",
    title: "Event 3",
    slug: "event-3",
    location: "Location 3",
    date: "Date 3",
    time: "Time 3",
  },
  {
    image: "/assets/images/event.webp",
    title: "Event 4",
    slug: "event-4",
    location: "Location 4",
    date: "Date 4",
    time: "Time 4",
  },
  {
    image: "/assets/images/event.webp",
    title: "Event 5",
    slug: "event-5",
    location: "Location 5",
    date: "Date 5",
    time: "Time 5",
  },
];

const Page = () => {
  return (
    <section className="w-full px-4 sm:px-8">
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

        <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <li key={event.title} className="w-full">
              <EventCard
                {...event}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;