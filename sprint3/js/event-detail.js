import { events } from "./data.js";

const container = document.querySelector("#detay");

if (container) {
  const id = new URLSearchParams(location.search).get("id");
  const event = events.find(e => e.id === id);

  if (!event) {
    container.innerHTML = `
      <div class="hata-kutusu">
        <h2>Etkinlik Bulunamadı!</h2>
        <p>Aradığınız etkinlik mevcut değil veya geçersiz bir bağlantı kullandınız.</p>
        <a href="etkinlikler.html" class="buton">&larr; Etkinliklere Dön</a>
      </div>
    `;
  } else {
    document.title = `${event.title} - Etkinlik Detayı`;

    const parts = event.date.split("-");
    const dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
    const formattedDate = dateObj.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    container.innerHTML = `
      <h1>${event.title}</h1>
      <dl class="kunye">
        <dt>Kategori</dt>
        <dd>${event.category}</dd>

        <dt>Tarih & Saat</dt>
        <dd>${formattedDate}, ${event.time}</dd>

        <dt>Yer</dt>
        <dd>${event.location}</dd>

        <dt>Kontenjan</dt>
        <dd>${event.capacity} Kişi</dd>

        <dt>Açıklama</dt>
        <dd>${event.description}</dd>
      </dl>
      <div class="detay-islem" style="margin-top: 20px; display: flex; gap: 15px;">
        <a href="etkinlikler.html">&larr; Listeye dön</a>
        <a href="etkinlik-guncelle.html?id=${event.id}" class="guncelle-link">Bu etkinliği güncelle</a>
      </div>
    `;
  }
}