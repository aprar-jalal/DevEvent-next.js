import EventCard from "@/components/Card/eventCard";
import ExploreMore from "./../components/buttons/exploreMore";

const Page = async () => {
   const response = await fetch("http://localhost:3000/api/events");

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const events = await response.json();

  console.log("events:", events);

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
            <li key={event._id} className="w-full">
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