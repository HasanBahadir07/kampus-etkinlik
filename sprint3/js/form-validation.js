document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  if (form) {
    form.addEventListener('submit', (e) => {
      const title = document.getElementById('etkinlik-adi');
      const category = document.getElementById('kategori');
      const date = document.getElementById('tarih');
      const desc = document.getElementById('aciklama');

      if (!title.value.trim()) {
        alert('Etkinlik adı boş bırakılamaz!');
        e.preventDefault();
        title.focus();
        return;
      }

      if (!category.value) {
        alert('Lütfen bir kategori seçiniz!');
        e.preventDefault();
        category.focus();
        return;
      }

      if (!date.value) {
        alert('Lütfen etkinlik tarihini seçiniz!');
        e.preventDefault();
        date.focus();
        return;
      }

      const selectedDate = new Date(date.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        alert('Geçmiş bir tarih seçemezsiniz!');
        e.preventDefault();
        date.focus();
        return;
      }

      if (!desc.value.trim()) {
        alert('Açıklama alanı boş bırakılamaz!');
        e.preventDefault();
        desc.focus();
        return;
      }

      alert('İşlem başarıyla doğrulandı!');
    });
  }
});