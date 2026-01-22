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
