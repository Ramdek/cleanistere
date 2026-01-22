var map = L.map('map').setView([48.4084476,-4.5409099], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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

getUserLocation();