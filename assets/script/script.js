'use strict'

function isUserLoggedIn() {

    var state = JSON.parse(localStorage.getItem("state"));
    return state && state.isLoggedIn;
}

async function init() {
    // Vérification du local storage
    if (!localStorage.getItem('Utilisateurs') || !localStorage.getItem('Evenements') 
        || !localStorage.getItem('Inscrits') || !localStorage.getItem('Materiels') ||
        !localStorage.getItem('Zones'))
    {
        await loadData();
    } else {
        // Si le local storage n'est pas vide, utiliser les données existantes
        const eventsData = JSON.parse(localStorage.getItem('Evenements'));
        addMarkers(eventsData);
    }

    display_stats();
    initCalendar();

    if (isUserLoggedIn()) {
        var userId = JSON.parse(localStorage.getItem("state")).userId;
        document.getElementById("presentation").style.display = "none";
        var users = JSON.parse(localStorage.getItem("Utilisateurs"));
        const user = users.find(user => user.id == userId)
        document.getElementById("login-button").innerText = "Déconnexion de " + user.prenom + " " + user.nom;

        setTimeout(() => {

            document.getElementById("login-button").addEventListener("click", disconnect, { once: true });
        }, 100);

        document.getElementById("addEvent-button").classList.remove("hidden");
        document.getElementById("addEvent-button").addEventListener("click", showAddEventModal, { capture: true });

    } else {
        document.getElementById("presentation").style.display = "inherit";
        document.getElementById("login-button").innerText = "Connexion";

        document.getElementById("login-button").addEventListener("click", showLoginModal, { once: true });
    }
}

init()