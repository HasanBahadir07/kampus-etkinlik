interface EventFilterProps {
  searchText: string;
  category: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export default function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div>
        <label>Etkinlik Ara</label>
        <input
          type="text"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Örn. atölye, kariyer"
          style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>Kategori</label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px" }}
        >
          <option value="">Tümü</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}