"use client";

import { createBooking } from "@/lib/actions/booking.action";
import { useState } from "react";


const BookEvent = ({ eventId }: { eventId: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    const result = await createBooking({
      eventId,
      email,
    });

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message);
    }
  };

  if (submitted) {
    return (
      <p className="text-sm">
        Thank you for signing up!
      </p>
    );
  }

  return (
    <div id="book-event">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email Address"
            required
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="button-submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookEvent;