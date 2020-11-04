// MODAL POPUP ON MOBILE DEVICES
const overlay = document.querySelector(".overlay");
const filter = document.getElementById("filter-modal");
const modalBox = document.querySelector(".modal_box");

filter.addEventListener('click', function () {
    overlay.classList.add("active");
    modalBox.classList.add("active");
});

overlay.addEventListener('click', function () {
    overlay.classList.remove("active");
    modalBox.classList.remove("active");
});