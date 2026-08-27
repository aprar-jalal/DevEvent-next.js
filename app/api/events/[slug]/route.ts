import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event, { IEvent } from "@/models/Event";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { message: "Invalid slug parameter" },
        { status: 400 }
      );
    }
    const sanitizedSlug = slug.trim().toLowerCase();
    const event: IEvent | null = await Event.findOne({
      slug: sanitizedSlug,
    }).lean();

    if (!event) {
      return NextResponse.json(
        {
          message: `Event with slug '${sanitizedSlug}' not found`,
        },
        { status: 404 }
      );
    }
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch event:", error);

    return NextResponse.json(
      { message: "Failed to fetch event" },
      { status: 500 }
    );
  }
}