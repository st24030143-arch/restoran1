// Centro inicial
const center = [25.5732, -103.4948];
const zoom = 16;

// Crear mapa
const map = L.map("map").setView(center, zoom);

// Capa
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Marcador inicial
L.marker(center).addTo(map).bindPopup("Ubicación inicial").openPopup();

// Icono
const customIcon = L.icon({
  iconUrl: "img/icons/ft.ico.ico", // 🔥 cambia a png
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Elementos del dialog
const dialog = document.querySelector(".popup");
const inputLatitude = document.querySelector(".input-latitude");
const inputLongitude = document.querySelector(".input-longitude");

// Marcador dinámico
let clickMarker = null;

// CLICK EN MAPA (ÚNICO)
map.on("click", (e) => {
  const { lat, lng } = e.latlng;

  // llenar inputs
  inputLatitude.value = lat.toFixed(6);
  inputLongitude.value = lng.toFixed(6);

  // mostrar popup
  dialog.showModal();

  // quitar marcador anterior
  if (clickMarker) {
    map.removeLayer(clickMarker);
  }
  document.querySelector(".button-cancel").addEventListener("click", () => {
    dialog.close();
  });
  document.querySelector(".button-save").addEventListener("click", () => {
    dialog.close();
  });
  const buttonSave = document.querySelector(".button-save");
  const placeName = document.querySelector(".place-name");
  const betweenStreets = document.querySelector(".between-streets");
  buttonSave.addEventListener("click", () => {
    const name = placeName.value;
    const streets = betweenStreets.value;
    const lat = inputLatitude.value;
    const lng = inputLongitude.value;

    // crear marcador con info
    L.marker([lat, lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(
        `
      <b>${name}</b><br>
      ${streets}<br>
      Lat: ${lat}<br>
      Lng: ${lng}
    `,
      )
      .openPopup();

    // cerrar popup
    dialog.close();
  });

  // nuevo marcador
  clickMarker = L.marker([lat, lng], { icon: customIcon })
    .addTo(map)
    .bindPopup(`Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`);
});
