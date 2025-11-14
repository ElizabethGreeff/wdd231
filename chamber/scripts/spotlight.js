fetch("data/members.json")
    .then(res => res.json())
    .then(data => {
        const box = document.getElementById("spotlights");

        const filtered = data.members.filter(m =>
            m.membership === 2 || m.membership === 3
        );

        const selected = filtered.sort(() => Math.random() - 0.5).slice(0, 3);

        selected.forEach(m => {
            const card = document.createElement("div");
            card.classList.add("spotlight");

            card.innerHTML = `
            <section class="spotlight-card">
                <h3 class="spotlight-title">${m.name}</h3>
                <p class="spotlight-tagline">${m.tagline}</p>

                <div class="spotlight-content">
                    <img class="spotlight-img" src="${m.image}" alt="${m.name}">

                    <div class="spotlight-info">
                        <p><strong>Email:</strong> ${m.email}</p>
                        <p><strong>Phone:</strong> ${m.phone}</p>
                        <p><strong>Website:</strong> <a href="${m.website}" target="_blank">${m.website}</a></p>
                    </div>
                </div>
            </section>
            `;

            box.appendChild(card);
        });
    })
    .catch(err => console.error(err));