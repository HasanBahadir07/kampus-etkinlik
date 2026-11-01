import { useEffect, useState } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const SITE_NAME = "Kampüs Etkinlikleri";

const menuItems: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" },
];

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Her çizimde hesaplanan değerler (state değil)
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const categories = [...new Set(events.map((e) => e.category))];
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Sayfaya göre başlık ve alt yazı
  let title = SITE_NAME;
  let text: string | undefined;
  if (page === "home") {
    text = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
  } else if (page === "events") {
    title = "Tüm Etkinlikler";
    text = "Kampüste düzenlenen seminer, atölye, söyleşi ve yarışmalar.";
  } else if (page === "detail") {
    title = selected ? selected.title : "Etkinlik bulunamadı";
  } else if (page === "add") {
    title = "Etkinlik Ekle";
  } else {
    title = "Etkinlik Güncelle";
  }

  const tabTitle = title === SITE_NAME ? SITE_NAME : `${SITE_NAME} — ${title}`;
  useEffect(() => {
    document.title = tabTitle;
  }, [tabTitle]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <span className="kategori">{event.category}</span>
        <p>
          <strong>Tarih:</strong> {formatDate(event.date)}, {event.time}
        </p>
        <p>
          <strong>Yer:</strong> {event.location}
        </p>
        <p>
          <strong>Kontenjan:</strong> {event.capacity} kişi
        </p>
        <p>{event.description}</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör &rarr;
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </header>
      <nav className="menu" aria-label="Ana menü">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href="#"
            aria-current={page === item.name ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              go(item.name);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </section>
            <button className="buton" onClick={() => go("events")}>
              Tüm etkinlikleri gör
            </button>
          </>
        )}

        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  id="arama"
                  type="search"
                  value={searchText}
                  placeholder="Örn. atölye, kariyer"
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
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
            {filtered.length > 0 && (
              <p className="sonuc">{filtered.length} etkinlik listeleniyor.</p>
            )}
            {filtered.length === 0 ? (
              <p className="sonuc">
                Aradığınız kriterlere uygun etkinlik bulunamadı.
              </p>
            ) : (
              <section className="etkinlik-listesi">
                {filtered.map(renderCard)}
              </section>
            )}
          </>
        )}

        {page === "detail" && !selected && (
          <div className="hata-kutusu">
            <h2>Etkinlik bulunamadı</h2>
            <p>Aradığınız etkinlik mevcut değil.</p>
            <button className="buton" onClick={() => go("events")}>
              &larr; Listeye dön
            </button>
          </div>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            {selected.image && (
              <figure>
                <img src={selected.image} alt={`${selected.title} afişi`} />
                <figcaption>{selected.title} afişi</figcaption>
              </figure>
            )}
            <section className="kunye-kutusu">
              <h2>Etkinlik Künyesi</h2>
              <dl className="kunye">
                <dt>Tarih</dt>
                <dd>
                  {formatDate(selected.date)}, {selected.time}
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>
            </section>
            <section className="aciklama">
              <h2>Açıklama</h2>
              <p>{selected.description}</p>
            </section>
            <div className="islemler">
              <button className="buton" onClick={() => go("events")}>
                &larr; Listeye dön
              </button>
              <button
                className="buton"
                onClick={() => go("update", selected.id)}
              >
                Bu etkinliği güncelle
              </button>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <form className="form" onSubmit={(e) => e.preventDefault()}>
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
        )}
      </main>

      <footer>
        <p>Hasan Bahadır Yıldız · 2311012017 · 2026</p>
      </footer>
    </>
  );
}

export default App;
