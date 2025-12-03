let allData = {};

async function loadCreatures() {
    const res = await fetch("data/creatures.json");
    const data = await res.json();
    allData = data;

    const hash = window.location.hash.replace("#", "");

    if (["greece", "rome", "egypt", "norse"].includes(hash)) {
        displayCreatures(hash);
        highlightFilterButton(hash);
    } else {
        displayCreatures("all");
    }
}

function highlightFilterButton(hash) {
    const filterButton = document.querySelector(`[data-filter="${hash}"]`);
    if (filterButton) {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        filterButton.classList.add("active");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    loadCreatures();
});

function displayCreatures(filter) {
    const grid = document.getElementById("creature-grid");
    grid.innerHTML = "";

    let creatures =
        filter === "all"
            ? Object.values(allData).flat()
            : allData[filter] || [];

    creatures.forEach(creature => createCard(creature, grid));
}

function createCard(creature, grid) {
    const card = document.createElement("div");
    card.className = "creature-card";

    card.innerHTML = `
        <div class="card-img">
            <img src="${creature.image}" alt="${creature.name}" loading="lazy">
        </div>
        <h2>${creature.name}</h2>

        <div class="stats">
            <p><strong>Damage:</strong> ${creature.damage}</p>
            <p><strong>Health:</strong> ${creature.health}</p>
        </div>

        <div class="powers">
            <h3>Powers</h3>
            <ul>${creature.powers.map(p => `<li>${p}</li>`).join("")}</ul>
        </div>

        <div class="weaknesses">
            <h3>Weaknesses</h3>
            <ul>${creature.weaknesses.map(w => `<li>${w}</li>`).join("")}</ul>
        </div>
    `;

    grid.appendChild(card);
}

document.addEventListener("click", e => {
    if (e.target.classList.contains("filter-btn")) {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        displayCreatures(e.target.dataset.filter);
    }
});

loadCreatures();