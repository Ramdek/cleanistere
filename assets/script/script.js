'use strict'

function init() {
    display_stats();
    
    var state = JSON.parse(localStorage.getItem("state"));
    if (state && state.isLoggedIn) {
        document.getElementById("presentation").style.display = "none";
        var users = JSON.parse(localStorage.getItem("Utilisateurs"));
        const user = users.find(user => user.id == state.userId)
        document.getElementById("login-button").innerText = "Déconnexion de " + user.prenom + " " + user.nom;

        setTimeout(() => {

            document.getElementById("login-button").addEventListener("click", disconnect, { once: true });
        }, 100);
    } else {

        document.getElementById("presentation").style.display = "inherit";
        document.getElementById("login-button").innerText = "Connexion";

        document.getElementById("login-button").addEventListener("click", showLoginModal, { once: true });
    }
}

init()
