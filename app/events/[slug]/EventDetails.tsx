import Image from "next/image";
import { notFound } from "next/navigation";
import { SlCalender } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";
import { IoMdTime, IoIosPeople } from "react-icons/io";
import { FaLaptop } from "react-icons/fa";
import type { ReactNode } from "react";

import BookEvent from "@/components/bookEvent/bookEvent";
import EventCard from "@/components/Card/eventCard";

import {
  getSimilarEventsBySlug,
} from "@/lib/actions/event.actions";
import { IEvent } from "@/models/Event";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({
  icon,
  label,
}: {
  icon: ReactNode;
  alt?: string;
  label: string;
}) => {
  return (
    <div className="flex gap-2  items-center">
      {icon}
      <p>{label}</p>
    </div>
  );
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (<div className='agenda'>
    <h2 className='text-2xl font-bold'>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>
          {item}
        </li>
      ))}
    </ul>
  </div>);
}

const EventTage = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {tags.map((tag) => (
        <div className="pill" key={tag}>
          {tag}
        </div>
      ))}
    </div>
  );
};
const bookings = 10;

const EventDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const response = await fetch(`${BASE_URL}/api/events/${slug}`);
  const event =await response.json();
  if (!event) {
    notFound();
  }

  const similarEvents = await getSimilarEventsBySlug(event.slug);

  return (
      <section id="event ">
        <div className="header">
          <h1 className='text-3xl font-bold'>Event Description</h1>
          <p>{event.description}</p>
        </div>
  
        <div className="details grid grid-cols-1 gap-10 lg:grid-cols-[1fr_350px]">
  
  
          <div className="content flex flex-col gap-10">
  
            <Image
              src={event.image}
              alt={event.title}
              width={800}
              height={800}
              className="banner w-full rounded-xl object-cover"
            />
  
            <section className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p>{event.overview}</p>
            </section>
  
            <section className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold">Event Details</h2>
  
              <EventDetailItem
                icon={<SlCalender />}
                label={event.date}
              />
  
              <EventDetailItem
                icon={<IoMdTime />}
                label={event.time}
              />
  
              <EventDetailItem
                icon={<CiLocationOn />}
                label={event.location}
              />
  
              <EventDetailItem
                icon={<FaLaptop />}
                label={event.mode}
              />
  
              <EventDetailItem
                icon={<IoIosPeople />}
                label={event.audience}
              />
            </section>
  
            <EventAgenda agendaItems={event.agenda} />
  
            <section className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">
                About The Organizer
              </h2>
  
              <p>{event.organizer}</p>
            </section>
  
            <EventTage tags={event.tags} />
          </div>
  
          <aside className=" self-start lg:sticky lg:top-24 lg:h-fit">
            <div className="booking rounded-xl p-6 flex flex-col gap-3">
              <h2 className="text-lg font-semibold">
                Book Your Spot
              </h2>
              {bookings > 0 ? (
                <p className='text-sm'>
                  Join {bookings} people who have already booked their spot!
                </p>) : (
                <p className='text-sm'> Be the first to book your spot!</p>
              )}
              <BookEvent eventId={event._id}/>
            </div>
          </aside>
        </div>
  
        <div className="flex w-full items-center  flex-col gap-4 pt-20 mb-4">
          <div className=" max-w-7xl">
          <h2 className="text-2xl font-bold mb-6">Similar Events</h2>
          <ul className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarEvents.map((event: IEvent) => (
              <li key={event.slug} className="h-full w-full">
                <EventCard {...event} />
              </li>
            ))}
          </ul>
          </div>
        </div>
      </section>
    );
};

export default EventDetails;