// default map layer
// let map = L.map("map", {
//   layers: MQ.mapLayer(),
//   center: [51.1079, 17.0385],
//   zoom: 12,
//   measureControl: true,
// });

mapboxgl.accessToken =
        "pk.eyJ1IjoicG0wMDA5OSIsImEiOiJjbDJmNno0bmIwN3B5M2pwYWJ4MWV0M3JnIn0.sTd6mp33j7xcvM9Yy5rDDQ";
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: "country,region,place,postcode,locality,neighborhood",
      });
      const geocoder1 = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: "country,region,place,postcode,locality,neighborhood",
      });

      geocoder.addTo("#geocoder");
      geocoder1.addTo("#geocoder1");


      // Get the geocoder results container.
      const results = document.getElementById("result");

      // Add geocoder result to container.
      geocoder.on("result", (e) => {
        results.innerText = JSON.stringify(e.result.place_name);
        window.sessionStorage.setItem('start',results.innerText)
      });
      geocoder1.on("result", (e) => {
        results.innerText = JSON.stringify(e.result.place_name);
        window.sessionStorage.setItem('end',results.innerText)
      });

function runDirection(start, end) {
  // recreating new map layer after removal
  let map = L.map("map", {
    layers: MQ.mapLayer(),
    center: [35.791188, -78.636755],
    zoom: 12,
  measureControl: true,
  });

  var dir = MQ.routing.directions();

  dir.route({
    locations: [start, end],
  });

  CustomRouteLayer = MQ.Routing.RouteLayer.extend({
    createStartMarker: (location) => {
      var custom_icon;
      var marker;

      custom_icon = L.icon({
        iconUrl: "img/red.png",
        iconSize: [20, 29],
        iconAnchor: [10, 29],
        popupAnchor: [0, -29],
      });

      marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

      return marker;
    },

    createEndMarker: (location) => {
      var custom_icon;
      var marker;

      custom_icon = L.icon({
        iconUrl: "img/blue.png",
        iconSize: [20, 29],
        iconAnchor: [10, 29],
        popupAnchor: [0, -29],
      });

      marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);
      L.m;
      return marker;
    },
  });

  map.addLayer(
    new CustomRouteLayer({
      directions: dir,
      fitBounds: true,
    })
  );
  dir.on("success", function (data) {
    let dis = data.route.distance;
    if ((dis = dis)) {
      document.getElementById(
        "distance"
      ).innerHTML = `<h1>Distance : ${Math.round(
        data.route.distance * 1.61
      )} Km</h1>`;
    }
    return dis;
  });
}

function hello(){
  submitForm(event);
}

// function that runs when form submitted
async function submitForm(event) {
  event.preventDefault();
  

  // getting form data
  start = window.sessionStorage.getItem('start')
  end = window.sessionStorage.getItem('end')
  console.log(start);
  console.log(end);


  // run directions function
  await runDirection(start, end);

  // reset form
  document.getElementById("form").reset();
  document.getElementById("formBlock").style.cssText = "display:none;";
}

// asign the form to form variable
const form = document.getElementById("form");

// call the submitForm() function when submitting the form
form.addEventListener("submit", submitForm);
