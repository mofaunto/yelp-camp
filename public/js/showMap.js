mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "showMap",
  style: "mapbox://styles/mapbox/outdoors-v11",
  center: campground.geometry.coordinates,
  zoom: 10,
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates.slice())
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${campground.title}</h3><p>${campground.location}</p>`
    )
  )
  .addTo(map);
