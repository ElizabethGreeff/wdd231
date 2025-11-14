fetch("data/events.json")
    .then(res => res.json())
    .then(data => {
        const box = document.getElementById("eventsContainer");
        data.forEach(ev => {
            const p = document.createElement("p");
            p.textContent = `${ev.date}: ${ev.title}`;
            box.appendChild(p);
        });
    })
    .catch(err => console.error(err));