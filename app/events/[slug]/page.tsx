import { Suspense } from "react";
import EventDetails from "./EventDetails";

const EventPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  return (
    <Suspense fallback={<div>Loading event...</div>}>
      <EventDetails params={params} />
    </Suspense>
  );
};

export default EventPage;