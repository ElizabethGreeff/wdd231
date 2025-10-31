const courses = [
    { code: "WDD130", name: "Web Fundamentals", credits: 3, subject: "WDD", completed: true },
    { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, subject: "WDD", completed: true },
    { code: "CSE110", name: "Introduction to Programming", credits: 2, subject: "CSE", completed: true },
    { code: "CSE111", name: "Programming with Functions", credits: 2, subject: "CSE", completed: true },
    { code: "WDD231", name: "Web Frontend Development I", credits: 2, subject: "WDD", completed: false },
];

const container = document.getElementById("course-container");
const totalCredits = document.getElementById("total-credits");

function displayCourses(list) {
    container.innerHTML = "";
    let total = 0;

    list.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) card.classList.add("completed");
        card.innerHTML = `${course.code}<br>${course.name}`;
        container.appendChild(card);
        total += course.credits;
    });

    totalCredits.textContent = `Total credits: ${total}`;
}

document.getElementById("all").addEventListener("click", () => displayCourses(courses));
document.getElementById("cse").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "CSE")));
document.getElementById("wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "WDD")));

displayCourses(courses);