import { useState } from 'react';
import { events as initialEvents } from './data/events';
import type { CampusEvent, Category, PageName } from './types/campus-event';
import { searchEvents, filterByCategory } from './utils/filter-events';
import './App.css';

export default function App() {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);
  const [activePage, setActivePage] = useState<PageName>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Güncellenecek etkinlik state'i
  const [editingEvent, setEditingEvent] = useState<CampusEvent | null>(null);

  // Filtreleme işlemleri
  const searchedEvents = searchEvents(events, searchTerm);
  const filteredEvents = filterByCategory(searchedEvents, selectedCategory);

  // Detay sayfası için seçili etkinlik
  const selectedEvent = events.find((ev) => ev.id === selectedEventId);

  // Etkinlik Güncelleme Fonksiyonu
  const handleUpdateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    setEvents((prev) =>
      prev.map((ev) => (ev.id === editingEvent.id ? editingEvent : ev))
    );
    setEditingEvent(null);
    alert('Etkinlik başarıyla güncellendi!');
  };

  return (
    <div className="app-container">
      {/* Üst Navigasyon */}
      <header className="navbar">
        <h1 className="logo" onClick={() => setActivePage('home')}>
          🎓 Kampüs Etkinlikleri
        </h1>
        <nav>
          <button
            className={activePage === 'home' ? 'active' : ''}
            onClick={() => setActivePage('home')}
          >
            Ana Sayfa
          </button>
          <button
            className={activePage === 'events' ? 'active' : ''}
            onClick={() => setActivePage('events')}
          >
            Etkinlikler
          </button>
        </nav>
      </header>

      {/* İÇERİK SAYFALARI */}
      <main className="main-content">
        {/* 1. ANA SAYFA */}
        {activePage === 'home' && (
          <section className="home-page">
            <div className="hero">
              <h2>Kampüsteki En Güncel Etkinlikleri Keşfet!</h2>
              <p>Seminerler, atölyeler, söyleşiler ve yarışmalar seni bekliyor.</p>
              <button
                className="cta-btn"
                onClick={() => setActivePage('events')}
              >
                Tüm Etkinlikleri Gör
              </button>
            </div>

            <h3>Öne Çıkan Etkinlikler</h3>
            <div className="event-grid">
              {events.slice(0, 3).map((ev) => (
                <div key={ev.id} className="event-card">
                  <span className="badge">{ev.category}</span>
                  <h3>{ev.title}</h3>
                  <p>📅 {ev.date} - {ev.time}</p>
                  <p>📍 {ev.location}</p>
                  <button
                    className="detail-btn"
                    onClick={() => {
                      setSelectedEventId(ev.id);
                      setActivePage('detail');
                    }}
                  >
                    Detayları Gör
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2. ETKİNLİKLER LİSTESİ SAYFASI */}
        {activePage === 'events' && (
          <section className="events-page">
            <h2>Tüm Etkinlikler</h2>

            {/* Arama ve Filtre Paneli */}
            <div className="filter-bar">
              <input
                type="text"
                placeholder="Etkinlik adı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="Tümü">Tüm Kategoriler</option>
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>
            </div>

            {/* Liste */}
            <div className="event-grid">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((ev) => (
                  <div key={ev.id} className="event-card">
                    <span className="badge">{ev.category}</span>
                    <h3>{ev.title}</h3>
                    <p>📅 {ev.date} - {ev.time}</p>
                    <p>📍 {ev.location}</p>
                    <div className="card-actions">
                      <button
                        className="detail-btn"
                        onClick={() => {
                          setSelectedEventId(ev.id);
                          setActivePage('detail');
                        }}
                      >
                        Detay
                      </button>

                      {/* HOCANIN İSTEDİĞİ GÜNCELLEME BUTONU */}
                      <button
                        className="edit-btn"
                        onClick={() => setEditingEvent(ev)}
                      >
                        ✏️ Güncelle
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Aradığınız kriterlere uygun etkinlik bulunamadı.</p>
              )}
            </div>
          </section>
        )}

        {/* 3. ETKİNLİK DETAY SAYFASI */}
        {activePage === 'detail' && selectedEvent && (
          <section className="detail-page">
            <button className="back-btn" onClick={() => setActivePage('events')}>
              ← Etkinliklere Dön
            </button>
            <div className="detail-card">
              <span className="badge">{selectedEvent.category}</span>
              <h2>{selectedEvent.title}</h2>
              <p className="description">{selectedEvent.description}</p>
              <div className="info">
                <p><strong>📅 Tarih & Saat:</strong> {selectedEvent.date} ({selectedEvent.time})</p>
                <p><strong>📍 Konum:</strong> {selectedEvent.location}</p>
                <p><strong>👥 Kontenjan:</strong> {selectedEvent.capacity} Kişi</p>
              </div>

              <button
                className="edit-btn"
                style={{ marginTop: '15px' }}
                onClick={() => setEditingEvent(selectedEvent)}
              >
                ✏️ Bu Etkinliği Güncelle
              </button>
            </div>
          </section>
        )}
      </main>

      {/* GÜNCELLEME MODAL / POPUP */}
      {editingEvent && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Etkinliği Güncelle</h2>
            <form onSubmit={handleUpdateEvent}>
              <label>Etkinlik Başlığı:</label>
              <input
                type="text"
                value={editingEvent.title}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, title: e.target.value })
                }
                required
              />

              <label>Kategori:</label>
              <select
                value={editingEvent.category}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    category: e.target.value as Category,
                  })
                }
              >
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>

              <label>Tarih:</label>
              <input
                type="text"
                value={editingEvent.date}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, date: e.target.value })
                }
              />

              <label>Saat:</label>
              <input
                type="text"
                value={editingEvent.time}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, time: e.target.value })
                }
              />

              <label>Konum:</label>
              <input
                type="text"
                value={editingEvent.location}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, location: e.target.value })
                }
              />

              <label>Açıklama:</label>
              <textarea
                value={editingEvent.description}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, description: e.target.value })
                }
              />

              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Kaydet
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditingEvent(null)}
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}