// Set timestamp when page loads
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#timestamp").value = Date.now();
    
    // Modal handling
    const openButtons = document.querySelectorAll("[data-modal]");
    const closeButtons = document.querySelectorAll(".close-modal");

    openButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = document.getElementById(btn.dataset.modal);
            modal.classList.add("show");
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".modal").classList.remove("show");
        });
    });

    // Close modal on background click
    document.querySelectorAll(".modal").forEach(m => {
        m.addEventListener("click", (e) => {
            if (e.target === m) m.classList.remove("show");
        });
    });
});