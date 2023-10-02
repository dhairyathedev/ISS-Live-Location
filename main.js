mapboxgl.accessToken = 'sk.eyJ1IjoiZGhhaXJ5YXNoYWgtMjQiLCJhIjoiY2xuOHMwNHZyMDByOTJtbWQ5YWJzMmZ5eiJ9.GIN_6klWeopNwTl_xqi0RQ';
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 0 // starting zoom
    });
var long = 0;
var latt = 0;
const ISSLoc = (lng, lat) => {
    
    const geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [lng, lat]
            },
            properties: {
                title: 'Mapbox',
                description: 'San Francisco, California'
              }
          },
        ]
      };
      for (const feature of geojson.features) {
        const el = document.getElementById('marker');
      
        new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
      }
      new mapboxgl.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
          )
      )
      .addTo(map);
      new mapboxgl.Marker(el)
  .setLngLat(feature.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
      )
  )
  .addTo(map);
}

const getISSLoc = () => {
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then(response => response.json())
    .then(data => {
        ISSLoc(data.longitude, data.latitude)
        long = data.longitude
        latt = data.latitude
        
        // console.log(data)
    })
}

const updateISSLoc = () => {
    setInterval(() => {
        getISSLoc()
    }, 1000  )
}
updateISSLoc()
// ISSLoc(long, latt)
