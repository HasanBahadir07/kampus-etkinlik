# Kampüs Etkinlikleri · Backend (Sprint 9)

Hasan Bahadır Yıldız · 2311012017

Etkinlikleri JSON olarak veren Node + Express REST API. Sprint 9 ile tam CRUD: etkinlik eklenir, güncellenir, silinir, aranır; yaklaşan etkinlikler ayrı listelenir. Veriler MongoDB'de durur; uygulama veritabanıyla Mongoose üzerinden konuşur. Geliştirmede yerel MongoDB, canlıda MongoDB Atlas (Frankfurt, M0) kullanılır.

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

`src/models/event-model.js` · koleksiyon: `events`

| Alan | Tür | Kural |
| ---- | --- | ----- |
| `title` | String | zorunlu |
| `category` | String | zorunlu, `Seminer` · `Atölye` · `Söyleşi` · `Yarışma` |
| `date` | Date | zorunlu; API'de `GG-AA-YYYY` (ör. `15-10-2026`) |
| `time` | String | varsayılan `""` |
| `capacity` | Number | varsayılan `0`, en az `0` |
| `location` | String | varsayılan `""` |
| `description` | String | varsayılan `""` |
| `createdAt`, `updatedAt` | Date | Mongoose otomatik ekler |

`_id`'yi MongoDB atar ve yanıtlarda `_id` olarak döner.

Tarih API'de `"15-10-2026"` biçiminde gelir ve gider, veritabanında gerçek `Date` olarak durur (`src/utils/date.js`: `parseDate` / `formatDate`). Metin olarak saklansaydı `"05-11-2026"` `"15-10-2026"`dan küçük sayılır, Kasım Ekim'den önce sıralanırdı. `"2026-12-20"` ya da `"31-02-2026"` gibi değerler 400 döner.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| ------ | -------- | ---- | -------- | ---- | ----- |
| GET | `/health` | Sunucu ayakta mı? | 200 | — | çalışıyor |
| GET | `/events` | Liste, tarihe göre sıralı (`?search=` & `?category=` isteğe bağlı) | 200 | — | çalışıyor |
| GET | `/events/upcoming` | Bugün ve sonrası, en yakın önce | 200 | — | çalışıyor |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | çalışıyor |
| POST | `/events` | Yeni etkinlik | 201 | 400 | çalışıyor |
| PATCH | `/events/:id` | Sadece gönderilen alanları güncelle, güncel kaydı döndür | 200 | 400, 404 | çalışıyor |
| DELETE | `/events/:id` | Sil, gövde yok | 204 | 404 | çalışıyor |

Status code'lar: 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 veritabanı hatası

### Hata biçimi

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

Geçersiz biçimdeki ya da olmayan id'ler (ör. `/events/yok`, silinmiş id) her endpoint'te 404 döner.

### POST /events gövdesi

`title`, `category` ve `date` zorunlu; diğer alanlar isteğe bağlı. Şemaya uymayan veri (ör. `date: "2026-12-01"`, `category: "Parti"`, negatif `capacity`) 400 döner.

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "01-12-2026",
  "capacity": 30
}
```

### PATCH /events/:id

Sadece gönderilen alanlar değişir; yanıt kaydın güncel hâlidir. Şema kuralları (enum, trim, min, tarih) güncellemede de çalışır.

| Body | Sonuç |
| ---- | ----- |
| `{ "capacity": 55 }` | 200 · sadece capacity değişti |
| `{ "title": "  Yeni Başlık  " }` | 200 · `"Yeni Başlık"` (trim) |
| `{ }` | 400 · Body is empty |
| `{ "category": "Parti" }` | 400 · enum dışında |
| `{ "_id": "abc" }` | 400 · _id cannot be changed (`createdAt`, `updatedAt`, `__v` da) |
| olmayan id | 404 · Event not found |

### DELETE /events/:id

Silinince `204 No Content`, yanıt gövdesi yok. Aynı id ikinci kez silinmek istenirse 404.

### Arama ve filtre

| Adres | Filtre |
| ----- | ------ |
| `/events` | hepsi |
| `/events?category=Atölye` | kategori birebir |
| `/events?search=atölye` | başlıkta geçen, büyük/küçük harf fark etmez (`$regex`, `$options: "i"`) |
| `/events?search=atölye&category=Atölye` | ikisi birden |

Aramadaki `( * ?` gibi özel işaretler kaçırılır; `?search=(` 500 değil boş liste döner.

### GET /events/upcoming

Tarihi bugün ya da sonrası olan etkinlikler (`date: { $gte: bugünün başı }`), en yakın önce. Seed'deki iki geçmiş etkinlik (Robotik Atölyesi 15-10-2026, Web Tasarım Atölyesi 05-11-2026) bu listede yer almaz. Route, `/:id`'den önce tanımlıdır; yoksa `upcoming` bir id sanılıp 404 dönerdi.

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

`requests/kampus-api.json` Sprint 9 collection'ıdır (18 istek, 45 test). Postman › Import ile içe aktar; adres `baseUrl` değişkeninde (`http://localhost:3000`).

```
npm run seed
npm run dev
```

Sonra collection'a sağ tık › Run collection › Run. Hedef: 18 istek, 45 test, hepsi yeşil. Sonuç Runner › Export Results ile `requests/run-results.json` olarak kaydedilir.

02. istek listedeki ilk `_id`'yi, 05. istek yeni oluşan kaydın `_id`'sini kaydeder. PATCH ve DELETE o yeni kayıtla çalışır, seed verisi bozulmaz; istediğin kadar tekrar çalıştırılabilir.

| # | İstek | Beklenen |
| - | ----- | -------- |
| 01–04 | health, liste, tek kayıt, olmayan kayıt | 200, 200, 200, 404 |
| 05–07 | POST: tam body, eksik veri, yanlış tarih biçimi | 201, 400, 400 |
| 08–13 | PATCH: capacity, tarih, boş body, geçersiz kategori, _id, olmayan id | 200, 200, 400, 400, 400, 404 |
| 14–15 | `?search=atölye`, `?search=atölye&category=Atölye` | 200 |
| 16 | `/events/upcoming` | 200 · geçmiş tarihli yok, sıralı |
| 17–18 | DELETE, aynı kaydı tekrar DELETE | 204, 404 |

Terminalden (sunucu açıkken):

```
npm i -g newman
newman run https://webdersi.vercel.app/test.json
```
