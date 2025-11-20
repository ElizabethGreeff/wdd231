const params = new URLSearchParams(location.search);

["first", "last", "email", "phone", "organization"].forEach(field => {
    document.getElementById(field).textContent = params.get(field);
});

// timestamp
const rawTime = params.get("timestamp");

if (rawTime) {
    const date = new Date(Number(rawTime));

    const formatted = date.toLocaleString("en-GB", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    document.getElementById("timestamp").textContent = formatted;
}

// --- Confetti Burst ---
function confetti() {
    const count = 120;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        particle.className = "confetti-piece";
        document.body.appendChild(particle);

        const size = Math.random() * 8 + 4;
        const left = Math.random() * window.innerWidth;
        const duration = Math.random() * 2 + 2;

        particle.style.width = `${size}px`;
        particle.style.height = `${size * 0.4}px`;
        particle.style.left = `${left}px`;
        particle.style.animationDuration = `${duration}s`;

        setTimeout(() => particle.remove(), duration * 1000);
    }
}

confetti();