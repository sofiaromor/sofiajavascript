// Inicializar mapa centrado en España
var map = L.map('map').setView([40.4168, -3.7038], 6);

// Capa de mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Tiendas
var tiendas = [
    { nombre: "Tienda Madrid Centro", coords: [40.4168, -3.7038] },
    { nombre: "Tienda Barcelona", coords: [41.3874, 2.1686] },
    { nombre: "Tienda Valencia", coords: [39.4699, -0.3763] },
    { nombre: "Tienda Sevilla", coords: [37.3891, -5.9845] },
    { nombre: "Tienda Bilbao", coords: [43.2630, -2.9350] },
    { nombre: "Tienda Zaragoza", coords: [41.6488, -0.8891] }
];

// Marcadores de tiendas
tiendas.forEach((tienda, index) => {
    var marker = L.marker(tienda.coords)
        .addTo(map)
        .bindPopup(`<b>${tienda.nombre}</b>`);
    
    // Al hacer click en el marcador, dibujar ruta
    marker.on('click', function() {
        dibujarRuta(index);
    });
});

var visitorCoords;
var routeLine; // polyline de la ruta

// Obtener ubicación del visitante
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        visitorCoords = [position.coords.latitude, position.coords.longitude];

        // Marcador del visitante
        L.marker(visitorCoords).addTo(map).bindPopup("¡Tú estás aquí!").openPopup();

        // Dibujar ruta inicial a la tienda más cercana
        var nearestIndex = encontrarTiendaMasCercana(visitorCoords);
        dibujarRuta(nearestIndex);

    }, err => {
        alert("No se pudo obtener tu ubicación: " + err.message);
    });
} else {
    alert("Tu navegador no soporta geolocalización.");
}

// Función para dibujar ruta usando OSRM (solo polyline)
function dibujarRuta(tiendaIndex) {
    if (routeLine) {
        map.removeLayer(routeLine); // eliminar ruta anterior
    }

    // OSRM espera lon,lat
    var lon1 = visitorCoords[1], lat1 = visitorCoords[0];
    var lon2 = tiendas[tiendaIndex].coords[1], lat2 = tiendas[tiendaIndex].coords[0];

    var url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=geojson`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.routes || data.routes.length === 0) {
                alert("No se pudo calcular la ruta a esta tienda.");
                return;
            }

            var route = data.routes[0];

            // Dibujar la ruta
            routeLine = L.geoJSON(route.geometry, { color: 'blue', weight: 5 }).addTo(map);

            // Mostrar distancia en km
            var distanceKm = (route.distance / 1000).toFixed(2);
            document.getElementById('routing-instructions').innerHTML =
                `<p>Distancia hasta ${tiendas[tiendaIndex].nombre}: <b>${distanceKm} km</b></p>`;

            // Ajustar zoom para que se vea toda la ruta
            map.fitBounds(routeLine.getBounds());
        })
        .catch(err => {
            console.error(err);
            alert("Error al calcular la ruta. Intenta otra tienda.");
        });
}

// Encontrar la tienda más cercana
function encontrarTiendaMasCercana(coord) {
    let nearest = 0;
    let minDist = distance(coord, tiendas[0].coords);
    for (let i = 1; i < tiendas.length; i++) {
        let d = distance(coord, tiendas[i].coords);
        if (d < minDist) {
            nearest = i;
            minDist = d;
        }
    }
    return nearest;
}

// Evento del selector de tiendas
document.getElementById('tiendaSelect').addEventListener('change', function() {
    var index = parseInt(this.value);
    dibujarRuta(index);
});

// Función para calcular distancia aproximada entre dos coordenadas
function distance(coord1, coord2){
    var R = 6371; // km
    var dLat = (coord2[0]-coord1[0])*Math.PI/180;
    var dLon = (coord2[1]-coord1[1])*Math.PI/180;
    var a = Math.sin(dLat/2)**2 +
            Math.cos(coord1[0]*Math.PI/180) * Math.cos(coord2[0]*Math.PI/180) *
            Math.sin(dLon/2)**2;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}
