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

function handleLoginKeyPress(e) {

    if (e.key == "Escape") {
        closeLoginModal();
    } else if (e.key == "Enter") {
        tryLogin();
    }
}

function showLoginModal(e) {

    e.preventDefault();

    userField.value = '';
    passField.value = '';

    loginDialog.showModal();

    document.querySelector("#login-dialog el-dialog-backdrop").addEventListener("click", closeLoginModal, { once: true });
    document.querySelector("body").addEventListener("keydown", handleLoginKeyPress);
    document.getElementById("login-submit").addEventListener("click", tryLogin);
}

function closeLoginModal() {

    document.querySelector("#login-dialog el-dialog-backdrop").removeEventListener("click", closeLoginModal, { once: true });
    document.querySelector("body").removeEventListener("keydown", handleLoginKeyPress);
    document.getElementById("login-submit").removeEventListener("click", tryLogin);
    loginDialog.close();
    init();
}

function tryLogin() {

    const username = userField.value;
    const password = btoa(passField.value);

    if (username == "" || password == "") {
        return;
    }

    let utilisateur = JSON.parse(localStorage.getItem('Utilisateurs')).find(user => user.pseudo == username);

    if (utilisateur == null || password != utilisateur.mdp) {
        alert("Les identifiants ne sont pas valides");
    } else {
        let newState = getDefaultState();
        newState.userId = utilisateur.id;
        newState.isLoggedIn = true;

        localStorage.setItem("state", JSON.stringify(newState));

        closeLoginModal();
    }
}

function disconnect() {

    localStorage.setItem("state", JSON.stringify(getDefaultState()));

    console.debug(localStorage.getItem("state"))
    if (!document.getElementById("addEvent-button").classList.contains("hidden")) {
        document.getElementById("addEvent-button").classList.add("hidden");
    }
    init();
}