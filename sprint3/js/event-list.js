import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const searchInput = document.querySelector("#arama");
const categorySelect = document.querySelector("#kategori-filtre");
const resultStatus = document.querySelector("#sonuc");

// Kart Şablonu (Sprint 2 Sınıfları İle)
function createCard(event) {
  // Tarihi Türkçe formata dönüştürme (Örn: "12 Ekim 2026")
  const parts = event.date.split("-");
  const dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
  const formattedDate = dateObj.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return `
    <article class="kart">
      <h2>${event.title}</h2>
      <span class="kategori">${event.category}</span>
      <p><strong>Tarih:</strong> ${formattedDate} - ${event.time}</p>
      <p><strong>Yer:</strong> ${event.location}</p>
      <a href="etkinlik-detay.html?id=${event.id}">Detayları gör &rarr;</a>
    </article>
  `;
}

// Ekrana Basma
function render(dizi) {
  if (!list) return;
  if (dizi.length === 0) {
    list.innerHTML = `<p class="bulunamadi">Aradığınız kriterlere uygun etkinlik bulunamadı.</p>`;
  } else {
    list.innerHTML = dizi.map(createCard).join("");
  }
}

// İLK YÜKLEME VE SAYFA KONTROLÜ
if (list) {
  // Dinamik Kategori Seçeneklerini Yükle (Set)
  if (categorySelect) {
    const categories = [...new Set(events.map(e => e.category))];
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categorySelect.appendChild(option);
    });
  }

  // ANA SAYFA MI (data-limit="2") YOKSA LİSTE SAYFASI MI?
  if (list.dataset.limit) {
    const limit = Number(list.dataset.limit);
    // Tarihe göre sırala ve ilk N adedi al
    const sortedEvents = [...events]
      .sort((a, b) => {
        const dateA = a.date.split("-").reverse().join("-");
        const dateB = b.date.split("-").reverse().join("-");
        return dateA.localeCompare(dateB);
      })
      .slice(0, limit);

    render(sortedEvents);
  } else {
    // Liste Sayfası: Hepsini Bas ve Filtreleri Bağla
    render(events);
    if (resultStatus) resultStatus.textContent = `${events.length} etkinlik listeleniyor.`;

    function filterEvents() {
      const searchTerm = searchInput ? searchInput.value.toLocaleLowerCase("tr-TR").trim() : "";
      const selectedCategory = categorySelect ? categorySelect.value : "";

      const filtered = events.filter(e => {
        const titleMatch = e.title.toLocaleLowerCase("tr-TR").includes(searchTerm);
        const descMatch = e.description.toLocaleLowerCase("tr-TR").includes(searchTerm);
        const locMatch = e.location.toLocaleLowerCase("tr-TR").includes(searchTerm);
        const matchesSearch = titleMatch || descMatch || locMatch;

        const matchesCategory = selectedCategory === "" || e.category === selectedCategory;

        return matchesSearch && matchesCategory;
      });

      render(filtered);
      if (resultStatus) {
        resultStatus.textContent = `${filtered.length} etkinlik listeleniyor.`;
      }
    }

    if (searchInput) searchInput.addEventListener("input", filterEvents);
    if (categorySelect) categorySelect.addEventListener("change", filterEvents);
  }
}