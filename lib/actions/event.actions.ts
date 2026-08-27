"use server";

import connectDB from "../mongodb";
import Event from "@/models/Event";
import { cacheLife } from "next/cache";

export const getSimilarEventsBySlug = async (slug: string) => {
  'use cache'
   cacheLife('hours')
  try {
    await connectDB();

    const event = await Event.findOne({ slug }).lean();

    if (!event) {
      return [];
    }

    const similarEvents = await Event.find({
      _id: { $ne: event._id },
    })
      .limit(3)
      .lean();

    return similarEvents.map((event) => ({
      ...event,
      _id: event._id.toString(),
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to get similar events:", error);
    return [];
  }
};
