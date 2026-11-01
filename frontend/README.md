https://kampus-etkinlik-sprint3.vercel.app

# Kampüs Etkinlikleri · frontend (Sprint 5)

Vite + React + TypeScript. Çalıştırmak için: `npm install`, `npm run dev`.

- `package.json`: proje adı, komutlar (dev, build) ve paket listesi.
- `index.html`: tek HTML sayfası, içinde boş `div#root` var.
- `src/main.tsx`: React'i başlatır, App'i root'a çizer.
- `src/App.tsx`: state'leri tutar, sayfaları ve bileşenleri bir araya getirir.
- `src/App.css`: tüm stiller; renk ve font öğrenci numarasından gelir.
- `src/index.css`: genel stil; boş.
- `src/components/layout/`: Header, Navigation ve Footer bileşenleri.
- `src/components/events/`: EventCard, EventList, EventFilter ve EventDetail bileşenleri.
- `src/components/forms/EventForm.tsx`: ekleme ve güncelleme formu.
- `src/types/campus-event.ts`: Category ve CampusEvent tipleri.
- `src/types/page.ts`: PageName tipi.
- `src/data/events.ts`: 6 etkinlik verisi.
- `src/utils/filter-events.ts`: arama, kategori filtresi ve id ile bulma fonksiyonları.
- `src/utils/format-date.ts`: tarihi "15 Kasım 2026" biçimine çeviren fonksiyon.
- `public/`: olduğu gibi kopyalanan dosyalar (afiş).
