'use strict';

var map = L.map('map').setView([48.4084476,-4.5409099], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Icons
var greenIcon = L.icon({
    iconUrl: './assets/img/leaf-green.png',
    shadowUrl: './assets/img/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var pinIcon = L.icon({
    iconUrl: './assets/img/pin.png',

    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
        alert("La géolocalisation n'est pas supportée par ce navigateur.");
    }
}

// Callback pour modifier la vue de la carte
function setPosition(position) {
    var userLat = position.coords.latitude;
    var userLng = position.coords.longitude;

    // Centre la carte sur la position de l'utilisateur
    map.setView([userLat, userLng], 12);
    L.marker([userLat, userLng], {icon: pinIcon}).addTo(map);
}

// Callback pour gérer les erreurs de permissions à la carte
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Permission pour accéder à la localisation refusée.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Position géographique indisponible.");
            break;
        case error.TIMEOUT:
            alert("La demande de position a expiré.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Une erreur inconnue s'est produite.");
            break;
    }
}

// Ajout des marqueurs pour chaque événement
function addMarkers(events) {
    events.forEach(function(event) {
        var marker = L.marker([event.latitude, event.longitude], {icon: greenIcon}).addTo(map);
        marker.bindPopup(
            "<strong>" + event.ville + "</strong><br>" +
            "Déchets visés : " + event.dechets_vises_kg + " kg<br>" +
            "Déchets récoltés : " + event.dechets_recoltes_kg + " kg<br>" +
            "Participants : " + event.nb_participants
        );
    });
}

getUserLocation();