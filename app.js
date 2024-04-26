let map, marker, circle;
let updateInterval;
const centerLocation = [15.460242057381775, 73.83513626465253];
let circleRadius = 100;

function initMap() {
    map = L.map('map').setView(centerLocation, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        fillColor: 'lightblue'
    }).addTo(map);

    marker = L.marker(centerLocation).addTo(map);
    circle = L.circle(centerLocation, {
        color: 'red',
        fillColor: 'blue',
        fillOpacity: 0.2,
        radius: circleRadius
    }).addTo(map);

    getCurrentLocation();
    updateInterval = setInterval(getCurrentLocation, 5000);

    setInterval(reduceCircleRadius, 3000);
}

function reduceCircleRadius() {
    if (circleRadius > 30) {
        circleRadius -= circleRadius / 10;
        circle.setRadius(circleRadius);
    } else {
        clearInterval(updateInterval);
    }
}

function getCurrentLocation() {
    console.log("Updating map...");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const { latitude, longitude } = position.coords;
                const userLocation = [latitude, longitude];
                map.setView(userLocation, 20);
                marker.setLatLng(userLocation);
                const distance = map.distance(centerLocation, userLocation);
                if (distance > circleRadius) {
                    alert("You are outside the circle!");
                }
            },
            function(error) {
                console.error("Error getting current location:", error);
                handleLocationError(error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

function handleLocationError(error) {
    let errorMessage = "Error getting current location:";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage += " User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage += " Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMessage += " The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage += " An unknown error occurred.";
            break;
    }
    console.error(errorMessage);
    alert(errorMessage);
}

document.addEventListener('DOMContentLoaded', initMap);



