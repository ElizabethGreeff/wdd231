document.addEventListener("DOMContentLoaded", () => {
    const godModal = document.getElementById("god-modal");
    const modalContent = document.querySelector(".god-card-modal");
    const btn = document.getElementById("godcard-btn");

    const savedCard = localStorage.getItem("myGodCard");
    if (!savedCard) return;

    const card = JSON.parse(savedCard);

    btn.innerHTML = `<img src="${card.image}" alt="${card.name}">`;
    btn.style.display = "block";

    modalContent.innerHTML = `
        <img src="${card.image}" alt="${card.name}" loading="lazy">
        <h2>${card.name}</h2>
        <p><strong>Pantheon:</strong> ${card.pantheon.toUpperCase()}</p>
        <p><strong>Power:</strong> ${card.power}</p>
        <p><strong>Bonus DMG:</strong> ${card.bonusDamage}</p>
        <p><strong>Bonus HP:</strong> ${card.bonusHealth}</p>
    `;

    const showModal = () => {
        godModal.classList.add("show");
    };

    const hideModal = () => {
        godModal.classList.remove("show");
    };

    btn.addEventListener("click", showModal);

    godModal.addEventListener("click", e => {
        if (e.target === godModal) hideModal();
    });

    if (sessionStorage.getItem("justGotGod") === "true") {
        showModal();
        sessionStorage.removeItem("justGotGod");
    }
});