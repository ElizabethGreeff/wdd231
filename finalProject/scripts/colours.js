const themes = {
    Default: {
        background: "#F8F5E4",
        text: "#111111",
        primary: "#1A2A40",
        accent: "#D4A017",
        accent2: "#976508",
        lightText: "#ffffff"
    },

    Greek: {
        background: "#edf4ff",
        text: "#0d1b2a",
        primary: "#0d1b2a",
        accent: "#1a73e8",
        accent2: "#82b1e7ff",
        lightText: "#ffffff"
    },

    Roman: {
        background: "#fff7e6",
        text: "#3d1f0c",
        primary: "#3d1f0c",
        accent: "#e65656ff",
        accent2: "#c28800",
        lightText: "#ffffff"
    },

    Egyptian: {
        background: "#fef6d8",
        text: "#3c2f17",
        primary: "#3c2f17",
        accent: "#cfa93e",
        accent2: "#006b5c",
        lightText: "#ffffff"
    },

    Norse: {
        background: "#e5e5e5",
        text: "#1e1e1e",
        primary: "#093837",
        accent: "#d8b785",
        accent2: "#4a752dff",
        lightText: "#ffffff"
    }
};

function applyTheme(themeName) {
    const t = themes[themeName];
    if (!t) return;

    const root = document.documentElement;

    root.style.setProperty("--background", t.background);
    root.style.setProperty("--text", t.text);
    root.style.setProperty("--primary", t.primary);
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--accent2", t.accent2);
    root.style.setProperty("--light-text", t.lightText);
}

document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        applyTheme(btn.dataset.theme);
    });
});

document.getElementById("default-theme-btn").addEventListener("click", () => {
    applyTheme("Default");
});

document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.add('animate');
        setTimeout(() => btn.classList.remove('animate'), 700);
    });
});

const swirl = document.getElementById('themeSwirl');
const themeButtons = document.querySelectorAll('.theme-btn');

themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        swirl.style.background = btn.dataset.color;
        swirl.classList.add('active');

        setTimeout(() => swirl.classList.remove('active'), 600);
    });
});