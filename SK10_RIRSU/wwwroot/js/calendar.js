document.addEventListener('DOMContentLoaded', function () {
    createCalendar();

    document.getElementById('calendar').addEventListener('click', function (event) {
        if (event.target.classList.contains('calendar-day')) {
            var date = event.target.getAttribute('data-date');
            var eventText = prompt("Vnesite dogodek za " + date + ":");
            if (eventText) {
                event.target.innerHTML += "<div>" + eventText + "</div>";
            }
        }
    });
});

function createCalendar() {
    var calendar = document.getElementById('calendar');
    var currentDate = new Date();
    var daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    for (var day = 1; day <= daysInMonth; day++) {
        var cell = document.createElement('div');
        cell.className = 'calendar-day';
        cell.setAttribute('data-date', day);
        cell.innerText = day;
        calendar.appendChild(cell);
    }
}