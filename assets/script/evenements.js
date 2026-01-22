"use strict";

const addEventDialog = document.getElementById("add-event-dialog");
const latField = document.querySelector("#add-event-dialog input[name='lat']");
const lonField = document.querySelector("#add-event-dialog input[name='lon']");
const cpField = document.querySelector("#add-event-dialog input[name='cp']");
const villeField = document.querySelector("#add-event-dialog input[name='ville']");
const couvertureField = document.querySelector("#add-event-dialog input[name='couverture']");
const dechetEstimField = document.querySelector("#add-event-dialog input[name='dechet_estimation']");
const participantsField = document.querySelector("#add-event-dialog input[name='participants']");
const startDateField = document.querySelector("#add-event-dialog input[name='start_date']");
const endDateField = document.querySelector("#add-event-dialog input[name='end_date']");

function handleEventKeyPress(e) {

    if (e.key == "Escape") {
        closeEvent();
    } else if (e.key == "Enter") {
        createEvent();
    }
}

function showAddEventModal(e) {

    e.preventDefault();

    latField.value = '';
    lonField.value = '';
    cpField.value = '';
    villeField.value = '';
    couvertureField.value = '';
    dechetEstimField.value = '';
    participantsField.value = '';

    addEventDialog.showModal();

    document.querySelector("#add-event-dialog el-dialog-backdrop").addEventListener("click", closeEventModal, { once: true });
    document.querySelector("body").addEventListener("keydown", handleEventKeyPress);
    document.getElementById("addEvent-submit").addEventListener("click", createEvent);
}

function closeEventModal() {

    document.querySelector("#add-event-dialog el-dialog-backdrop").removeEventListener("click", closeEventModal, { once: true });
    document.querySelector("body").removeEventListener("keydown", handleEventKeyPress);
    document.getElementById("addEvent-submit").removeEventListener("click", createEvent);
    addEventDialog.close();
}

function createEvent() {

    const lat = parseFloat(latField.value);
    const lon = parseFloat(lonField.value);
    const cp = cpField.value;
    const ville = villeField.value;
    const couverture = parseFloat(couvertureField.value);
    const dechetEstimation = parseInt(dechetEstimField.value);
    const participants = parseInt(participantsField.value);
    const startDate = new Date(startDateField.value);
    const endDate = new Date(endDateField.value);

    if (isNaN(lat) || isNaN(lon) || isNaN(cp) || isNaN(couverture) || isNaN(dechetEstimation) || isNaN(participants)) {
        alert('Veuillez remplir tous les champs du formulaire de création de collecte');
        return;
    }
    // Vérification de la validité des dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert('Veuillez sélectionner des dates valides');
        return;
    }

    // Vérification que la date de fin est postérieure à la date de début
    if (endDate <= startDate) {
        alert('La date de fin doit être postérieure à la date de début');
        return;
    }

    // Récupérer les événements existants du localStorage
    let evenements = JSON.parse(localStorage.getItem('Evenements')) || [];

    // Générer un nouvel ID (le prochain ID disponible)
    const nouvelId = evenements.length > 0 
        ? Math.max(...evenements.map(e => e.id)) + 1 
        : 101;

    
    // Créer le nouvel événement
    const nouvelEvenement = {
        "id": nouvelId,
        "latitude": lat,
        "longitude": lon,
        "code_postal": cp,
        "ville": ville,
        "zone_couverte_km": couverture,
        "dechets_vises_kg": dechetEstimation,
        "dechets_recoltes_kg": 0,
        "nb_participants": participants,
        "start_date": startDate.toISOString(), // Date de début depuis le champ
        "end_date": endDate.toISOString()
    };

    // Ajouter le nouvel événement au tableau
    evenements.push(nouvelEvenement);

    // Sauvegarder dans le localStorage
    localStorage.setItem('Evenements', JSON.stringify(evenements));

    // Optionnel : Confirmation ou réinitialisation du formulaire
    alert(`Événement ajouté avec l'ID ${nouvelId}`);
    
    // Réinitialiser les champs du formulaire (optionnel)
    latField.value = '';
    lonField.value = '';
    cpField.value = '';
    villeField.value = '';
    couvertureField.value = '';
    dechetEstimField.value = '';
    participantsField.value = '';
    
    closeEventModal();

    // Refresh pour màj map + calendar
    location.reload()
}