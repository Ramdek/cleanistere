'use strict';

function loadData() {
    fetch('./assets/misc/bdd.json')
        .then(response => response.json())
        .then(data => {
            for (const [key, value] of Object.entries(data)) {
                localStorage.setItem(key, JSON.stringify(value));
            }
            // Charge les évènements sur la carte
            addMarkers(data.Evenements);
        })
        .catch(error => console.error('Erreur lors du chargement :', error));
}


// Vérification du local storage
if (!localStorage.getItem('Utilisateurs') || !localStorage.getItem('Evenements') 
    || !localStorage.getItem('Inscrits') || !localStorage.getItem('Materiels') ||
    !localStorage.getItem('Zones'))
{
    loadData();
} else {
    // Si le local storage n'est pas vide, utiliser les données existantes
    const eventsData = JSON.parse(localStorage.getItem('Evenements'));
    addMarkers(eventsData);
}