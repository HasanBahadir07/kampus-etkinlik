import type { CampusEvent } from "../../types/campus-event"; // import type yaptık
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: () => void;
}

export default function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
      <h2>{event.title}</h2>
      <p><strong>Tarih:</strong> {formatDate(event.date)}</p>
      <p><strong>Yer:</strong> {event.location}</p>
      <p><strong>Kategori:</strong> {event.category}</p>
      <p><strong>Açıklama:</strong> {event.description}</p>
      
      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <button onClick={onBack} style={{ padding: "8px 15px", cursor: "pointer" }}>Listeye dön</button>
        <button onClick={onEdit} style={{ padding: "8px 15px", backgroundColor: "#0066cc", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Bu etkinliği güncelle</button>
      </div>
    </div>
  );
}