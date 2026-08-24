import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const booking = await Booking.create({
      eventId: body.eventId,
      email: body.email,
    });

    return NextResponse.json(
      {
        message: "Booking created successfully",
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create booking",
      },
      { status: 400 }
    );
  }
}