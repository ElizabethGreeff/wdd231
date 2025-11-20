async function loadCourses() {
    const response = await fetch("../data/courses.json");
    const data = await response.json();
    return data.courses;
}

const container = document.getElementById("course-container");
const totalCredits = document.getElementById("total-credits");
const courseDetails = document.getElementById("course-details");

function displayCourses(list) {
    container.innerHTML = "";
    let total = 0;

    list.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) card.classList.add("completed");

        card.innerHTML = `
            <strong>${course.code}</strong><br>
            ${course.title}
        `;

        card.addEventListener("click", () => displayCourseDetails(course));

        container.appendChild(card);
        total += course.credits;
    });
    totalCredits.textContent = `Total credits: ${total}`;
}

function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${course.code}</h2>
        <h3>${course.title}</h3>

        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p><strong>Description:</strong> ${course.description}</p>
        <p><strong>Technologies:</strong> 
            ${Array.isArray(course.technology)
            ? course.technology.join(", ")
            : course.technology}
        </p>
    `;

    courseDetails.showModal();

    document.getElementById("closeModal").addEventListener("click", () => {
        courseDetails.close();
    });

    courseDetails.addEventListener("click", (e) => {
        const dialogRect = courseDetails.getBoundingClientRect();
        const inside =
            e.clientX >= dialogRect.left &&
            e.clientX <= dialogRect.right &&
            e.clientY >= dialogRect.top &&
            e.clientY <= dialogRect.bottom;

        if (!inside) courseDetails.close();
    });
}

function setFilterButtons(courses) {
    document.getElementById("all").addEventListener("click", () => displayCourses(courses));
    document.getElementById("cse").addEventListener("click", () =>
        displayCourses(courses.filter(c => c.code.startsWith("CSE")))
    );
    document.getElementById("wdd").addEventListener("click", () =>
        displayCourses(courses.filter(c => c.code.startsWith("WDD")))
    );
}

loadCourses().then(courses => {
    setFilterButtons(courses);
    displayCourses(courses);
});