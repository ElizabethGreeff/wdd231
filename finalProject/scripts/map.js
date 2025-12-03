const tooltip = document.getElementById("mapTooltip");
const areas = document.querySelectorAll(".map-container svg path");

areas.forEach(area => {
    area.addEventListener("mousemove", (e) => {
        tooltip.style.display = "block";
        tooltip.style.left = e.pageX + -490 + "px";
        tooltip.style.top = e.pageY + -350 + "px";
        tooltip.textContent = area.classList.value.toUpperCase();
    });

    area.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
    });
});