https://hasanbahadiryildiz-frontend.vercel.app

# Kampüs Etkinlikleri · frontend (Sprint 6 + Vize)

Hasan Bahadır Yıldız · 2311012017. Vite + React + TypeScript + React Router.

## Kurulum

```
npm install
npm run dev
```

Üretim derlemesi için `npm run build`, derlemeyi denemek için `npm run preview`.

## Route listesi

| Adres | Sayfa |
| ----- | ----- |
| `/` | HomePage: yaklaşan 2 etkinlik |
| `/events` | EventsPage: liste, arama, kategori filtresi |
| `/events/:id` | EventDetailPage: etkinlik detayı |
| `/login` | LoginPage |
| `/register` | RegisterPage |
| `/forgot-password` | ForgotPasswordPage |
| `/admin` | AdminPage: tablo, düzenle, sil |
| `/admin/new` | AddEventPage |
| `/admin/:id/edit` | EditEventPage |
| `*` | NotFoundPage |

## Klasör yapısı

- `src/components/layout/`: Header, Navigation (NavLink), Footer.
- `src/components/events/`: EventCard, EventList, EventFilter, EventDetail.
- `src/components/forms/EventForm.tsx`: ekleme ve güncelleme için ortak controlled form.
- `src/context/EventsContext.tsx`: etkinlik listesi ve addEvent, updateEvent, deleteEvent.
- `src/pages/`: adrese bağlı 10 sayfa.
- `src/types/campus-event.ts`: Category, CampusEvent, EventFormData, EventFormErrors.
- `src/utils/`: filter-events, format-date, validate-event.
- `src/data/events.ts`: başlangıç etkinlik verisi.
- `vercel.json`: sayfa yenilendiğinde route'ların 404 vermemesi için yönlendirme.
