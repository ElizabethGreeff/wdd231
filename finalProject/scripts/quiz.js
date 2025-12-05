export function initQuiz() {
    document.getElementById("quiz-form").addEventListener("submit", e => {
        e.preventDefault();

        const answers = ["q1", "q2", "q3", "q4", "q5"].map(q => {
            const chosen = document.querySelector(`input[name="${q}"]:checked`);
            return chosen ? chosen.value : null;
        });

        if (answers.includes(null)) {
            alert("Answer all questions, chosen one ✨");
            return;
        }

        const scores = { greece: 0, rome: 0, egypt: 0, norse: 0 };
        answers.forEach(p => scores[p]++);
        const pantheon = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

        const gods = {
            greece: [
                { name: "Zeus", power: "Lightning Fury", image: "images/zeus.webp" },
                { name: "Athena", power: "Strategic Brilliance", image: "images/athena.webp" }
            ],
            rome: [
                { name: "Jupiter", power: "Skyfire Wrath", image: "images/jupiter.webp" },
                { name: "Mars", power: "Warborn Strength", image: "images/mars.webp" }
            ],
            egypt: [
                { name: "Ra", power: "Solar Ascension", image: "images/ra.webp" },
                { name: "Isis", power: "Mystic Rebirth", image: "images/isis.webp" }
            ],
            norse: [
                { name: "Thor", power: "Thunderstrike", image: "images/thor.webp" },
                { name: "Odin", power: "Allfather Sight", image: "images/odin.webp" }
            ]
        };

        const god = gods[pantheon][Math.floor(Math.random() * gods[pantheon].length)];

        const godCard = {
            pantheon,
            name: god.name,
            power: god.power,
            image: god.image,
            bonusDamage: Math.floor(Math.random() * 25) + 10,
            bonusHealth: Math.floor(Math.random() * 40) + 20
        };

        localStorage.setItem("myGodCard", JSON.stringify(godCard));
        sessionStorage.setItem("justGotGod", "true");

        window.location.href = `creatures.html#${pantheon}`;
    });
}