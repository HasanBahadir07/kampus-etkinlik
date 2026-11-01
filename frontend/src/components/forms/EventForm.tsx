interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <p className="not">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <div>
        <label htmlFor="title">Etkinlik Adı</label>
        <input
          id="title"
          type="text"
          maxLength={80}
          placeholder="Örn. Kariyer Günleri 2026"
          required
        />
      </div>
      <div>
        <label htmlFor="category">Kategori</label>
        <select id="category" required>
          <option value="">Seçiniz</option>
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Yarışma">Yarışma</option>
        </select>
      </div>
      <div>
        <label htmlFor="date">Tarih</label>
        <input id="date" type="date" required />
      </div>
      <div>
        <label htmlFor="time">Saat</label>
        <input id="time" type="time" required />
      </div>
      <div>
        <label htmlFor="location">Yer</label>
        <input
          id="location"
          type="text"
          placeholder="Örn. A Blok Konferans Salonu"
          required
        />
      </div>
      <div>
        <label htmlFor="capacity">Kontenjan</label>
        <input id="capacity" type="number" min={1} max={1000} />
      </div>
      <div>
        <label htmlFor="description">Açıklama</label>
        <textarea id="description" rows={5} />
      </div>
      <button className="buton" type="submit">
        Kaydet
      </button>
    </form>
  );
}

export default EventForm;
