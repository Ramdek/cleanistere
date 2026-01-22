'use strict'

function init() {
    var state = JSON.parse(localStorage.getItem("state"));
    if (state && state.isLoggedIn) {
        document.getElementById("presentation").style.display = "none";
        var users = JSON.parse(localStorage.getItem("Utilisateurs"));
        const user = users.find(user => user.id == state.userId)
        document.getElementById("login-button").innerText = "Déconnexion de " + user.prenom + " " + user.nom;
    }
}

init()
