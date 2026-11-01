https://kampus-etkinlik-sprint3.vercel.app

# Kampüs Etkinlikleri · frontend (Sprint 4)

Vite + React + TypeScript. Çalıştırmak için: `npm install`, `npm run dev`.

- `package.json`: proje adı, komutlar (dev, build) ve paket listesi.
- `index.html`: tek HTML sayfası, içinde boş `div#root` var.
- `src/main.tsx`: React'i başlatır, App'i root'a çizer.
- `src/App.tsx`: 5 sayfanın hepsi burada; sayfa geçişi state ile yapılır.
- `src/App.css`: tüm stiller; renk ve font öğrenci numarasından gelir.
- `src/index.css`: genel stil; bu sprintte boş.
- `src/types/campus-event.ts`: Category ve CampusEvent tipleri.
- `src/data/events.ts`: 6 etkinlik verisi.
- `src/utils/filter-events.ts`: arama, kategori filtresi ve id ile bulma fonksiyonları.
- `public/`: olduğu gibi kopyalanan dosyalar (afiş).
