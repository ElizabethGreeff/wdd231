const navButton = document.getElementById('ham-btn');
const navBar = document.getElementById('nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

