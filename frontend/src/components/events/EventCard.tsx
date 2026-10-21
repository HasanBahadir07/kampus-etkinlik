import type { CampusEvent } from "../../types/campus-event"; // type-only import yaptık

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

export default function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", marginBottom: "10px" }}>
      <h2>{event.title}</h2>
      <p>Tarih: {event.date}</p>
      <button 
        onClick={() => onShowDetail(event.id)}
        style={{ padding: "6px 12px", backgroundColor: "#0066cc", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Detayları gör
      </button>
    </div>
  );
}