import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './redux/postsSlice'; // Redux slice yolun nasılsa ona göre ayarlayabilirsin
import { PageName } from './types/page';

// Modüler Bileşenlerimiz
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import EventList from './components/events/EventList';
import EventFilter from './components/events/EventFilter';
import EventDetail from './components/events/EventDetail';
import EventForm from './components/forms/EventForm';

function App() {
  const dispatch = useDispatch<any>();
  const { items, isLoading, isError } = useSelector((state: any) => state.posts);

  // App içinde tutulan state'ler (Lifting state up)
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Kategorileri dinamik türetme
  const categories = Array.from(new Set(items.map((item: any) => item.category))).filter(Boolean) as string[];

  // Filtreleme Mantığı
  const filteredItems = items.filter((item: any) => {
    const matchesSearch = item.title?.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = category ? item.category === category : true;
    return matchesSearch && matchesCategory;
  });

  // Seçilen detay etkinliği bulma
  const selectedEvent = items.find((item: any) => item.id === selectedId);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      {/* Çerçeve: Header ve Navigation */}
      <Header 
        title={page === "detail" && selectedEvent ? selectedEvent.title : "Kampüs Etkinlikleri"} 
        text={page === "home" ? "Kampüsteki etkinlikleri, atölye ve söyleşileri takip edin." : undefined} 
      />
      
      <Navigation current={page} onNavigate={(newPage) => {
        setPage(newPage);
        setSelectedId(null);
      }} />

      {/* Main Alanı: Sayfalara göre bileşen değişimi */}
      <main style={{ marginTop: "20px", minHeight: "400px" }}>
        {isLoading && <p>Yükleniyor...</p>}
        {isError && <p style={{ color: "red" }}>Veriler yüklenirken hata oluştu!</p>}

        {page === "home" && (
          <EventList 
            events={items.slice(0, 2)} 
            onShowDetail={(id) => {
              setSelectedId(id);
              setPage("detail");
            }} 
            emptyText="Yaklaşan etkinlik bulunmuyor." 
          />
        )}

        {page === "events" && (
          <div>
            <EventFilter 
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            <EventList 
              events={filteredItems} 
              onShowDetail={(id) => {
                setSelectedId(id);
                setPage("detail");
              }} 
              emptyText="Aranan kriterlere uygun etkinlik bulunamadı." 
            />
          </div>
        )}

        {page === "detail" && selectedEvent && (
          <EventDetail 
            event={selectedEvent} 
            onBack={() => setPage("home")} 
            onEdit={() => setPage("update")} 
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm 
            onSubmit={() => {
              window.scrollTo(0, 0);
              setPage("events");
            }} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;