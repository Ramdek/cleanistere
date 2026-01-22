"use strict";

const loginDialog = document.getElementById("login-dialog");
const userField = document.querySelector("#login-dialog input[name='username']");
const passField = document.querySelector("#login-dialog input[name='password']");

function getDefaultState() {
    return {
        userId: null,
        isLoggedIn: false,
    }
}

function showLoginModal() {

    userField.value = '';
    passField.value = '';
    
    loginDialog.showModal();
}

function tryLogin() {

    const username = userField.value;
    const password = btoa(passField.value);
    
    let utilisateur = JSON.parse(localStorage.getItem('Utilisateurs')).find(user => user.pseudo == username);

    console.debug(utilisateur);

    if (password == utilisateur.mdp) {

        let newState = getDefaultState();
        newState.userId = utilisateur.id;
        newState.isLoggedIn = true;

        localStorage.setItem("state", JSON.stringify(newState));

        loginDialog.close();
    } else {
        alert("Le identifiants ne sont pas valides");
    }
}

function init_login() {

    document.getElementById("login-button").addEventListener("click", showLoginModal);
    document.getElementById("login-submit").addEventListener("click", tryLogin);
}

init_login();