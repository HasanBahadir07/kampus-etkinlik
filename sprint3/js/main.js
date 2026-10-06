document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const eventCards = document.querySelectorAll('.event-card');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      eventCards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});