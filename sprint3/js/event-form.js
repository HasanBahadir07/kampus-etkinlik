import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const messageContainer = document.querySelector("#form-mesaj");

if (form) {
  const id = new URLSearchParams(location.search).get("id");
  const isGuncelleMode = form.dataset.mode === "guncelle";

  // ADIM 11: Güncelleme Sayfası Doldurma veya Uyarı Gösterme
  if (isGuncelleMode) {
    const currentEvent = events.find(e => e.id === id);

    if (currentEvent) {
      form.elements["ad"].value = currentEvent.title;
      form.elements["kategori"].value = currentEvent.category;
      
      // Tarihi YYYY-MM-DD input tipine dönüştür
      const parts = currentEvent.date.split("-");
      form.elements["tarih"].value = `${parts[2]}-${parts[1]}-${parts[0]}`;
      
      form.elements["saat"].value = currentEvent.time;
      form.elements["yer"].value = currentEvent.location;
      form.elements["kontenjan"].value = currentEvent.capacity;
      form.elements["aciklama"].value = currentEvent.description;
    } else {
      form.outerHTML = `
        <div class="hata-kutusu">
          <h2>Güncellenecek Etkinlik Bulunamadı!</h2>
          <p>Geçerli bir etkinlik ID'si olmadan güncelleme yapılamaz.</p>
          <a href="etkinlikler.html" class="buton">Etkinliklere Git</a>
        </div>
      `;
    }
  }

  // ADIM 9 & 10: Form Yakalama, Doğrulama ve Mesaj
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Hata mesajı yerlerini temizle
    document.querySelectorAll(".hata-metni").forEach(el => el.textContent = "");
    document.querySelectorAll("[aria-invalid]").forEach(el => el.removeAttribute("aria-invalid"));
    if (messageContainer) messageContainer.innerHTML = "";

    const fd = new FormData(form);

    const data = {
      title: fd.get("ad") ? fd.get("ad").trim() : "",
      category: fd.get("kategori") || "",
      date: fd.get("tarih") || "",
      time: fd.get("saat") || "",
      location: fd.get("yer") ? fd.get("yer").trim() : "",
      capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : "",
      description: fd.get("aciklama") ? fd.get("aciklama").trim() : ""
    };

    const errors = {};

    // Kurallar
    if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalıdır.";
    if (!data.category) errors.kategori = "Lütfen bir kategori seçiniz.";
    if (!data.date) errors.tarih = "Lütfen tarih alanını doldurunuz.";
    if (!data.time) errors.saat = "Lütfen saat alanını doldurunuz.";
    if (!data.location) errors.yer = "Lütfen yer bilgisini giriniz.";
    if (data.capacity !== "" && (data.capacity < 1 || data.capacity > 1000)) {
      errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalıdır.";
    }

    // Hataları ekrana basma
    if (Object.keys(errors).length > 0) {
      for (const [key, msg] of Object.entries(errors)) {
        const errSpan = document.querySelector(`#${key}-hata`);
        const inputElem = form.elements[key];

        if (errSpan) errSpan.textContent = msg;
        if (inputElem) inputElem.setAttribute("aria-invalid", "true");
      }

      if (messageContainer) {
        messageContainer.innerHTML = `<p class="hata-kutusu">Formda hatalı veya eksik alanlar var!</p>`;
      }
      return;
    }

    // Hata Yoksa Başarı Mesajı Gösterme
    if (messageContainer) {
      const modeText = isGuncelleMode ? "Etkinlik Başarıyla Güncellendi!" : "Yeni Etkinlik Oluşturuldu!";
      messageContainer.innerHTML = `
        <div class="basari-kutusu">
          <h3>${modeText}</h3>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    }
  });
}