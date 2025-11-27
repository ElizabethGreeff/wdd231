import { places } from '../data/discover.mjs';

const grid = document.getElementById('placesGrid');
const visitMessage = document.getElementById('visitMessage');

function friendlyTimestamp(ms) {
    const d = new Date(Number(ms));
    if (Number.isNaN(d)) return '';
    return d.toLocaleString(undefined, {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

(function handleLastVisit() {
    try {
        const key = 'discover-last-visit';
        const prev = localStorage.getItem(key);
        const now = Date.now();

        if (!prev) {
            visitMessage.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const prevMs = Number(prev);
            const diffMs = now - prevMs;
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            if (diffDays < 1) {
                visitMessage.textContent = "Back so soon! Awesome!";
            } else if (diffDays === 1) {
                visitMessage.textContent = "You last visited 1 day ago.";
            } else {
                visitMessage.textContent = `You last visited ${diffDays} days ago.`;
            }
        }

        localStorage.setItem(key, String(now));
    } catch (e) {
        console.warn('localStorage not available', e);
    }
})();


function buildCards(list) {
    if (!Array.isArray(list)) return;

    grid.innerHTML = '';

    list.forEach((p, i) => {
        const card = document.createElement('article');
        card.className = 'place-card';
        card.setAttribute('tabindex', '0');

        card.innerHTML = `
      <figure class="place-figure">
        <img src="${p.image}" alt="${p.name} — photo" loading="lazy" width="600" height="400">
      </figure>
      <div class="place-content">
        <h3 class="place-title">${p.name}</h3>
        <address class="place-address">${p.address}</address>
        <p class="place-desc">${p.description}</p>
        <div class="place-actions">
          <a class="btn learn-more" href="#" data-index="${i}">${p.button || 'Learn More'}</a>
          <a class="btn secondary" href="https://www.google.com/maps/search/${encodeURIComponent(p.address)}" target="_blank" rel="noopener">Map</a>
        </div>
      </div>
    `;
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const firstLink = card.querySelector('a.learn-more');
                if (firstLink) firstLink.click();
            }
        });

        grid.appendChild(card);
    });

    grid.addEventListener('click', (e) => {
        const a = e.target.closest('a.learn-more');
        if (!a) return;
        e.preventDefault();
        const idx = Number(a.dataset.index);
        const place = places[idx];
        if (!place) return;
        openModal(place);
    });
}

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModalBtn = document.getElementById("closeModal");

function openModal(place) {
    modalTitle.textContent = place.name;
    modalDescription.textContent = place.description;

    modalOverlay.classList.add("show");
}

function closeModal() {
    modalOverlay.classList.remove("show");
}

closeModalBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
});

document.addEventListener('DOMContentLoaded', () => {
    buildCards(places);
});