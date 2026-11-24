# Kampüs Etkinlikleri · Backend (Sprint 8)

Hasan Bahadır Yıldız · 2311012017

Etkinlikleri JSON olarak veren Node + Express REST API. Veriler MongoDB'de durur; uygulama veritabanıyla Mongoose üzerinden konuşur. Geliştirmede yerel MongoDB, canlıda MongoDB Atlas (Frankfurt, M0) kullanılır.

## Çalıştırma

```
cd backend
npm install
cp .env.example .env      # MONGODB_URI satırına Atlas adresini yaz
npm run seed              # 6 test etkinliğini veritabanına yükle
npm run dev
```

Sunucu `http://localhost:3000` adresinde açılır. Açılırken önce veritabanına bağlanır; bağlanamazsa hata verip kapanır.

| Komut | Ne yapar |
| ----- | -------- |
| `npm run dev` | `node --watch` ile başlatır; dosya değişince yeniden başlar |
| `npm start` | Sunucuyu izleme olmadan başlatır |
| `npm run seed` | `MONGODB_URI` veritabanındaki etkinlikleri silip 6 test etkinliğini yükler |
| `npm run seed:local` | Aynısını yerel `mongodb://localhost:27017/kampus` için yapar |

## Ortam değişkenleri

| Değişken | Varsayılan | Açıklama |
| -------- | ---------- | -------- |
| `PORT` | `3000` | Sunucunun dinlediği port |
| `MONGODB_URI` | `mongodb://localhost:27017/kampus` | Veritabanı adresi. Atlas için `mongodb+srv://...mongodb.net/kampus` |

Gerçek değerler `.env` dosyasında durur ve GitHub'a gönderilmez. Hangi değişkenlerin gerektiği `.env.example` içinde. Loglarda adresin kullanıcı adı ve şifre kısmı `***` ile gizlenir.

## Veri modeli

`src/models/event.js` · koleksiyon: `events`

| Alan | Tür | Kural |
| ---- | --- | ----- |
| `title` | String | zorunlu |
| `category` | String | zorunlu |
| `date` | String | zorunlu, `YYYY-MM-DD` |
| `time` | String | varsayılan `""` |
| `capacity` | Number | varsayılan `0`, en az `0` |
| `location` | String | varsayılan `""` |
| `description` | String | varsayılan `""` |
| `createdAt`, `updatedAt` | Date | Mongoose otomatik ekler |

`_id`'yi MongoDB atar; API yanıtlarında `id` olarak döner (`__v` gösterilmez).

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| ------ | -------- | ---- | -------- | ---- | ----- |
| GET | `/health` | Sunucu ayakta mı? | 200 | — | Sprint 7 |
| GET | `/events` | Listeyi getir, tarihe göre sıralı (`?category=Atölye` isteğe bağlı) | 200 | 500 | Sprint 8 · MongoDB |
| GET | `/events/:id` | Tek etkinlik | 200 | 404, 500 | Sprint 8 · MongoDB |
| POST | `/events` | Yeni etkinlik | 201 | 400, 500 | Sprint 8 · MongoDB |
| PUT | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

Status code'lar: 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 veritabanı hatası

### Hata biçimi

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

Geçersiz biçimdeki id'ler (ör. `/events/yok`) de 404 döner.

### POST /events gövdesi

`title`, `category` ve `date` zorunlu; diğer alanlar isteğe bağlı. Şemaya uymayan veri (ör. `date: "1 Aralık"`, negatif `capacity`) 400 döner.

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
    server.js                        .env'i okur, veritabanına bağlanır, portu dinler
    models/db.js                     Mongoose bağlantısı, bağlantı olayları, düzgün kapanış
    models/event.js                  Etkinlik şeması ve Event modeli
    routes/event-routes.js           Hangi adres hangi fonksiyona gider
    controllers/event-controller.js  İsteği işler, Event modeliyle veritabanına sorar
    data/events.js                   6 test etkinliği
    data/seed.js                     Test etkinliklerini veritabanına yükler
  requests/kampus-api.json           Postman collection (6 istek)
  .env.example
  .gitignore
  package.json
```

## Test

`requests/kampus-api.json` dosyasını Postman'e içe aktar (Import). Adres `baseUrl` değişkeninde (`http://localhost:3000`). İstekleri sırayla gönder; 2. istek ilk etkinliğin `id`'sini `eventId` değişkenine yazar, 3. istek onu kullanır.

| # | İstek | Beklenen |
| - | ----- | -------- |
| 1 | GET `/health` | 200 · ok + student |
| 2 | GET `/events` | 200 · 6 kayıt |
| 3 | GET `/events/{{eventId}}` | 200 · o etkinlik |
| 4 | GET `/events/yok` | 404 · error |
| 5 | POST `/events` (tam body) | 201 · yeni `id` |
| 6 | POST `/events` (sadece title) | 400 · error |

Testten sonra `npm run seed` veritabanını yeniden 6 kayda döndürür.
