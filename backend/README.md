# Kampüs Etkinlikleri · Backend (Sprint 7)

Hasan Bahadır Yıldız · 2311012017

Etkinlikleri JSON olarak veren Node + Express REST API. Veri şimdilik bellekte tutulur: sunucu yeniden başlayınca `POST` ile eklenen kayıtlar kaybolur (Sprint 8'de MongoDB gelecek).

## Çalıştırma

```
cd backend
npm install
cp .env.example .env
npm run dev
```

Sunucu `http://localhost:3000` adresinde açılır.

| Komut | Ne yapar |
| ----- | -------- |
| `npm run dev` | `node --watch` ile başlatır; dosya değişince yeniden başlar |
| `npm start` | Sunucuyu izleme olmadan başlatır |

## Ortam değişkenleri

| Değişken | Varsayılan | Açıklama |
| -------- | ---------- | -------- |
| `PORT` | `3000` | Sunucunun dinlediği port |

Gerçek değerler `.env` dosyasında durur ve GitHub'a gönderilmez. Hangi değişkenlerin gerektiği `.env.example` içinde.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| ------ | -------- | ---- | -------- | ---- | ----- |
| GET | `/health` | Sunucu ayakta mı? | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

Status code'lar: 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

### Hata biçimi

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

### POST /events gövdesi

`title`, `category` ve `date` zorunlu; diğer alanlar isteğe bağlı.

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "2026-12-01",
  "capacity": 30
}
```

## Klasör yapısı

```
backend/
  src/
    app.js                           Express uygulaması, middleware, route'ları bağlar
    server.js                        .env'i okur, portu dinler
    routes/event-routes.js           Hangi adres hangi fonksiyona gider
    controllers/event-controller.js  İsteği işler, yanıtı döndürür
    data/events.js                   Bellek içi etkinlik dizisi
  requests/kampus-api.json           Postman collection (6 istek)
  .env.example
  .gitignore
  package.json
```

## Test

`requests/kampus-api.json` dosyasını Postman'e içe aktar (Import) ve 6 isteği sırayla gönder:

| # | İstek | Beklenen |
| - | ----- | -------- |
| 1 | GET `/health` | 200 · ok + student |
| 2 | GET `/events` | 200 · 6 kayıt |
| 3 | GET `/events/event-2` | 200 · event-2 |
| 4 | GET `/events/yok` | 404 · error |
| 5 | POST `/events` (tam body) | 201 · yeni id |
| 6 | POST `/events` (sadece title) | 400 · error |
