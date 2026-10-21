interface EventFormProps {
  onSubmit: () => void;
}

export default function EventForm({ onSubmit }: EventFormProps) {
  return (
    <form 
      className="form" 
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "400px" }}
    >
      <h2>Yeni Etkinlik Ekle</h2>
      <div>
        <label>Etkinlik Adı</label>
        <input type="text" placeholder="Örn. Kariyer Günleri 2026" style={{ width: "100%", padding: "8px" }} />
      </div>
      <button type="submit" style={{ padding: "10px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        Kaydet
      </button>
    </form>
  );
}