import EventCard from '@/components/Card/eventCard';
import { IEvent } from '@/models/Event';
import { cacheLife } from 'next/cache';
import React from 'react'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Events =async () => {
  'use cache';
  cacheLife('hours');
    const response =await fetch(`${BASE_URL}/api/events`);
    const events =await response.json();
  return (
     <section className="w-full px-4 sm:px-8">
         <h1 className="hero-title mb-10">
      <span>Events</span> 
      </h1>
      <ul className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
  {events.map((event: IEvent) => (
    <li key={event.slug} className="h-full w-full">
      <EventCard {...event} />
    </li>
  ))}
</ul>
     </section>
  )
}

export default Events