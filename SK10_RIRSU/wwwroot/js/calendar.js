document.addEventListener('DOMContentLoaded', function () {
    var calendarCells = document.querySelectorAll('.calendar-cell');

    calendarCells.forEach(function (cell) {
        cell.addEventListener('click', function (event) {
            var eventText = prompt("Vnesite cas:");
            if (eventText) {
                event.target.innerHTML = eventText;
            }
        });
    });
});

