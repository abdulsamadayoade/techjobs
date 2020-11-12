// MODAL POPUP ON MOBILE DEVICES
const overlay = document.querySelector(".overlay");
const filter = document.getElementById("filter-modal");
const modalBox = document.querySelector(".modal-box");

filter.addEventListener('click', function () {
    overlay.classList.add("active");
    modalBox.classList.add("active");
});

overlay.addEventListener('click', function () {
    overlay.classList.remove("active");
    modalBox.classList.remove("active");
});

// THEME SWITCHER
const input = document.querySelector(".toggle-container input");

input.addEventListener("change", (e) => {
    if (e.target.checked) {
        document.body.setAttribute("data-theme", "dark");
    } else {
        document.body.setAttribute("data-theme", "light");
    }
});