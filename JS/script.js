
// Inicializar mapa centrado en España
var map = L.map('map').setView([40.4168, -3.7038], 6);

// Cargar capa de mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Tiendas inventadas con coordenadas
var tiendas = [
    { nombre: "Tienda Madrid Centro", coords: [40.4168, -3.7038] },
    { nombre: "Tienda Barcelona", coords: [41.3874, 2.1686] },
    { nombre: "Tienda Valencia", coords: [39.4699, -0.3763] },
    { nombre: "Tienda Sevilla", coords: [37.3891, -5.9845] },
    { nombre: "Tienda Bilbao", coords: [43.2630, -2.9350] },
    { nombre: "Tienda Zaragoza", coords: [41.6488, -0.8891] }
];

// Añadir marcadores
tiendas.forEach(tienda => {
    L.marker(tienda.coords)
        .addTo(map)
        .bindPopup(`<b>${tienda.nombre}</b><br>¡Ven a visitarnos!`);
});
