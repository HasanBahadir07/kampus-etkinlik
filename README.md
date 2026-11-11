# Kampüs Etkinlikleri

Hasan Bahadır Yıldız · 2311012017

**Canlı adres (Vercel):** https://hasanbahadiryildiz-frontend.vercel.app

Fakültedeki seminer, atölye ve söyleşileri listeleyen, ekleyip güncellenebilen ve silinebilen kampüs etkinlik uygulaması. Güncel uygulama Vite + React + TypeScript + React Router ile [`frontend/`](frontend/) klasöründe; etkinlikleri JSON olarak veren Node + Express REST API [`backend/`](backend/) klasöründe.

## Kurulum

```
cd frontend
npm install
npm run dev
```

## Route listesi

| Adres | Sayfa |
| ----- | ----- |
| `/` | HomePage |
| `/events` | EventsPage |
| `/events/:id` | EventDetailPage |
| `/login` | LoginPage |
| `/register` | RegisterPage |
| `/forgot-password` | ForgotPasswordPage |
| `/admin` | AdminPage |
| `/admin/new` | AddEventPage |
| `/admin/:id/edit` | EditEventPage |
| `*` | NotFoundPage |

Ayrıntılar: [frontend/README.md](frontend/README.md)

## Backend (Sprint 7)

```
cd backend
npm install
cp .env.example .env
npm run dev
```

API `http://localhost:3000` adresinde açılır. REST sözleşmesi: [backend/README.md](backend/README.md)

## Klasörler

- `backend/`: Sprint 7, Express REST API
- `frontend/`: Sprint 4–6 ve vize, React uygulaması
- `sprint1/`: semantik HTML sayfaları
- `sprint2/`: CSS
- `sprint3/`: ES6 modülleri ve JavaScript
