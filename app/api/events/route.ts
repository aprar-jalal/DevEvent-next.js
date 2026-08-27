import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/mongodb";
import Event from "@/models/Event";

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
   const limit = Number(searchParams.get("limit"));

const query = Event.find({});

if (limit) {
  query.limit(limit);
}

const events = await query.sort({ createdAt: -1 }).lean();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to fetch events:", error);

    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("image");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 },
      );
    }
   const title = formData.get("title");
   if (typeof title !== "string" || !title.trim()) {
  return NextResponse.json(
    { message: "Title is required" },
    { status: 400 }
  );
}
const slug = generateSlug(title);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "DevEvent",
            },
            (error, result) => {
              if (error) {
                reject(error);
                return;
              }
              if (!result) {
                reject(new Error("Cloudinary upload failed"));
                return;
              }
              resolve(result as { secure_url: string });
            },
          )
          .end(buffer);
      },
    );

    const eventData = Object.fromEntries(formData.entries());
    const event = await Event.create({
      ...eventData,
      image: uploadResult.secure_url,
      agenda: JSON.parse(eventData.agenda as string),
      tags: JSON.parse(eventData.tags as string),
      slug:slug,
    });
    return NextResponse.json(
      {
        message: "Event created successfully",
        event,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Event creation failed:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Event creation failed",
      },
      { status: 500 },
    );
  }
}

