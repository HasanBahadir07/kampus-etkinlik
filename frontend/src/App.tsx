import { useState } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category, PageName } from "./types/campus-event";
import {
  filterByCategory,
  findEventById,
  formatDate,
  searchEvents,
} from "./utils/filter-events";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );

  const categories: Category[] = [
    ...new Set(events.map((e) => e.category)),
  ] as Category[];

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <img
          src={event.image || "/afis.svg"}
          alt={event.title}
          className="kart-gorsel"
        />
        <div className="kart-icerik">
          <span className="kategori-etiketi">{event.category}</span>
          <h2>{event.title}</h2>
          <p className="tarih-konum">
            📅 {formatDate(event.date)} - 🕒 {event.time} | 📍 {event.location}
          </p>
          <p className="kontenjan">Kontenjan: {event.capacity} Kişi</p>
          <p>{event.description}</p>
          <button
            className="buton"
            onClick={() => go("detail", event.id)}
          >
            Detayları Gör
          </button>
        </div>
      </article>
    );
  }

  const selectedEvent = selectedId ? findEventById(events, selectedId) : null;

  return (
    <>
      <header className="site-baslik">
        <h1>Kampüs Etkinlikleri</h1>
      </header>

      <nav className="menu">
        <ul>
          <li>
            <a
              href="#home"
              aria-current={page === "home" ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go("home");
              }}
            >
              Ana Sayfa
            </a>
          </li>
          <li>
            <a
              href="#events"
              aria-current={page === "events" ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              Etkinlikler
            </a>
          </li>
        </ul>
      </nav>

      <main>
        {page === "home" && (
          <section className="sayfa-blok">
            <h2>Yaklaşan Etkinlikler</h2>
            <section className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </section>
          </section>
        )}

        {page === "events" && (
          <section className="sayfa-blok">
            <h2>Tüm Etkinlikler</h2>
            <div className="filtre-alani">
              <input
                type="text"
                placeholder="Etkinlik ara..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="arama-input"
              />
              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as Category | "")
                }
                className="kategori-select"
              >
                <option value="">Tüm Kategoriler</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <p className="sonuc-bilgisi">
              {filteredEvents.length === 0
                ? "Etkinlik bulunamadı."
                : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlik-listesi">
              {filteredEvents.map(renderCard)}
            </section>
          </section>
        )}

        {page === "detail" && (
          <section className="sayfa-blok">
            <button className="buton ikincil" onClick={() => go("events")}>
              ← Etkinliklere Dön
            </button>

            {selectedEvent ? (
              <article className="detay-kart">
                <h1>{selectedEvent.title}</h1>
                <span className="kategori-etiketi">{selectedEvent.category}</span>
                <p>
                  <strong>Tarih & Saat:</strong> {formatDate(selectedEvent.date)} - {selectedEvent.time}
                </p>
                <p>
                  <strong>Konum:</strong> {selectedEvent.location}
                </p>
                <p>
                  <strong>Kontenjan:</strong> {selectedEvent.capacity} Kişi
                </p>
                <p className="detay-aciklama">{selectedEvent.description}</p>
              </article>
            ) : (
              <p>Etkinlik bulunamadı.</p>
            )}
          </section>
        )}
      </main>

      <footer>
        <p>&copy; 2026 Kampüs Etkinlikleri. Tüm hakları saklıdır.</p>
      </footer>
    </>
  );
}

export default App;