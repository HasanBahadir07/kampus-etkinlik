import { useEffect, useState } from "react";
import "./App.css";
import EventDetail from "./components/events/EventDetail";
import EventFilter from "./components/events/EventFilter";
import EventList from "./components/events/EventList";
import EventForm from "./components/forms/EventForm";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

const SITE_NAME = "Kampüs Etkinlikleri";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

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

  return (
    <>
      <Header title={title} text={text} />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <button className="buton" onClick={() => go("events")}>
              Tüm etkinlikleri gör
            </button>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && (
              <p className="sonuc">{filtered.length} etkinlik listeleniyor.</p>
            )}
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aradığınız kriterlere uygun etkinlik bulunamadı."
            />
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
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
