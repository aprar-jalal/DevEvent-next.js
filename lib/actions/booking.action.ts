"use server";

import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

export const createBooking = async ({
  eventId,
  email,
}: {
  eventId: string;
  email: string;
}) => {
  try {
    await connectDB();
     const booking = await Booking.create({
      eventId,
      email,
    });

    return {
      success: true,
      message: "Booking created successfully",
    };
  } catch (error) {
    console.error("Failed to create booking:", error);

    return {
      success: false,
      message: "Failed to create booking",
    };
  }
};