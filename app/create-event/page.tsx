"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const CreateEvent = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [agenda, setAgenda] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>([""]);

  const addAgendaItem = () => {
    setAgenda([...agenda, ""]);
  };

  const removeAgendaItem = (index: number) => {
    setAgenda(agenda.filter((_, i) => i !== index));
  };

  const updateAgendaItem = (index: number, value: string) => {
    const updated = [...agenda];
    updated[index] = value;
    setAgenda(updated);
  };

  const addTag = () => {
    setTags([...tags, ""]);
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const updateTag = (index: number, value: string) => {
    const updated = [...tags];
    updated[index] = value;
    setTags(updated);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      formData.set(
        "agenda",
        JSON.stringify(agenda.filter((item) => item.trim() !== ""))
      );

      formData.set(
        "tags",
        JSON.stringify(tags.filter((tag) => tag.trim() !== ""))
      );

      const response = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to create event");
      }

      router.push(`/events/${data.event.slug}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-4xl px-4 pb-20 pt-10 sm:px-8">
      <div className="mb-10 text-center">
        <h1 className="hero-title">
          Create <span>Your Event</span>
        </h1>

        <p className="desc mx-auto">
          Share your event with the developer community.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glassmorphism flex flex-col gap-6"
      >

        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-white">
            Basic Information
          </h2>

         
            <div className="form-group">
              <label htmlFor="title">Event Title</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter event title"
                required
                className="form_input"
              />
            </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              placeholder="Describe your event..."
              required
              className="form_textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="overview">Overview</label>

            <textarea
              id="overview"
              name="overview"
              placeholder="Give attendees an overview of the event..."
              required
              className="form_textarea"
            />
          </div>
        </div>


        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-white">
            Event Image
          </h2>

          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-sm text-white"
          />
        </div>


        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-white">
            Event Details
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="form-group">
              <label htmlFor="venue">Venue</label>
              <input
                id="venue"
                name="venue"
                type="text"
                placeholder="Palestine Coding Academy"
                required
                className="form_input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Nablus, Palestine"
                required
                className="form_input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                name="date"
                type="date"
                required
                className="form_input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                id="time"
                name="time"
                type="time"
                required
                className="form_input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mode">Mode</label>

              <select
                id="mode"
                name="mode"
                required
                className="form_input"
                defaultValue=""
              >
                <option value="" disabled>
                  Select mode
                </option>
                <option value="offline">Offline</option>
                <option value="online">Online</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="audience">Audience</label>

              <input
                id="audience"
                name="audience"
                type="text"
                placeholder="Developers, students..."
                required
                className="form_input"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="organizer">Organizer</label>

          <input
            id="organizer"
            name="organizer"
            type="text"
            placeholder="DevEvent"
            required
            className="form_input"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Agenda
            </h2>

            <button
              type="button"
              onClick={addAgendaItem}
              className="outline_btn"
            >
              + Add Item
            </button>
          </div>

          {agenda.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  updateAgendaItem(index, e.target.value)
                }
                placeholder={`Agenda item ${index + 1}`}
                className="form_input mt-0 p-2 rounded-md"
              />

              {agenda.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAgendaItem(index)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Tags
            </h2>

            <button
              type="button"
              onClick={addTag}
              className="outline_btn"
            >
              + Add Tag
            </button>
          </div>

          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={tag}
                onChange={(e) =>
                  updateTag(index, e.target.value)
                }
                placeholder={`Tag ${index + 1}`}
                className="form_input mt-0 p-2 rounded-md"
              />

              {tags.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="black_btn w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </section>
  );
};

export default CreateEvent;