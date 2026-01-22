'use strict';

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    // Vérification du local storage pour récupérer les événements
    var eventsData = localStorage.getItem('Evenements');
    var events = eventsData ? JSON.parse(eventsData) : [];

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
        },
        events: events.map(event => ({
            title: 'Collecte à ' + event.ville,
            start: event.start_date,
            end: event.end_date,
            extendedProps: {
                dechetsVises: event.dechets_vises_kg,
                dechetsRecoltes: event.dechets_recoltes_kg,
                nbParticipants: event.nb_participants
            }
        })),
        editable: false
    });

    calendar.setOption('locale', 'fr');
    calendar.render();
});