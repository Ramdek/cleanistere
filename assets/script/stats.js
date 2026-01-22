'use strict'

function display_stats() {
    var evenements = JSON.parse(localStorage.getItem("Evenements"));

    var totalEvenements = evenements.length;
    var totalParticipants = evenements.reduce((acc, ev) => acc + ev.nb_participants, 0);
    var totalDechetsVises = evenements.reduce((acc, ev) => acc + ev.dechets_vises_kg, 0);
    var totalDechetsRecoltes = evenements.reduce((acc, ev) => acc + ev.dechets_recoltes_kg, 0);
    var moyenneDechetsParParticipant = (totalDechetsRecoltes / totalParticipants).toFixed(2);
    
    var statsHTML = `
    <ul>
    <li>Nombre total d'événements : ${totalEvenements}</li>
    <li>Nombre total de participants : ${totalParticipants}</li>
    <li>Total déchets visés (kg) : ${totalDechetsVises}</li>
    <li>Total déchets récoltés (kg) : ${totalDechetsRecoltes}</li>
    <li>Moyenne déchets récoltés par participant (kg) : ${moyenneDechetsParParticipant}</li>
    </ul>
    `;
    
    var presentation = document.getElementById("statistiques");
    presentation.querySelector("p").innerHTML = statsHTML;
}