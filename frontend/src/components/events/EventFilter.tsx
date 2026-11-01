import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: Category | "") => void;
}

function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <form className="filtre" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="arama">Etkinlik ara</label>
        <input
          id="arama"
          type="search"
          value={searchText}
          placeholder="Örn. atölye, kariyer"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="kategori-filtre">Kategori</label>
        <select
          id="kategori-filtre"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
        >
          <option value="">Tümü</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}

export default EventFilter;
