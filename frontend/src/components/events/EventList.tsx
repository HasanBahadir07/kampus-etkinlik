import EventCard from "./EventCard";
import type { CampusEvent } from "../../types/campus-event"; // import type yaptık

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText: string;
}

export default function EventList({ events, onShowDetail, emptyText }: EventListProps) {
  if (events.length === 0) {
    return <p className="sonuc">{emptyText}</p>;
  }

  return (
    <div>
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          event={event} 
          onShowDetail={onShowDetail} 
        />
      ))}
    </div>
  );
}