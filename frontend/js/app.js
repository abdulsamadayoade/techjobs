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

// TABS SWITCH
function openTab(evt, tabName) {
    // DECLARE ALL VARIABLES
    var i, tabcontent, tablinks;

    // GET ALL ELEMENTS WITH CLASS = "tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // GET ALL ELEMENTS WITH CLASS ="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    // SHOW THE CURRENT TAB, AND ADD AN "ACTIVE" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add('active');
}