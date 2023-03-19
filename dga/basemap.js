const myMap = L.map('map').setView([21.5, 83], 5);


//https://stackoverflow.com/questions/9394190/leaflet-map-api-with-google-satellite-layer

//L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
//    maxZoom: 20,
//    subdomains:['mt0','mt1','mt2','mt3']
//}).addTo(myMap);

const tileUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '';
const tileLayer = L.tileLayer(tileUrl,{attribution});
tileLayer.addTo(myMap);

//mapLink ='<a href="http://www.esri.com/">Esri</a>';
//wholink ='i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
//L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: '&copy; '+mapLink+', '+wholink, maxZoom: 18,}).addTo(myMap);

//const videoUrl = 'https://www.mapbox.com/bites/00188/patricia_nasa.webm';
//const videoBounds = [[ 32, -130], [ 13, -100]];
//L.videoOverlay(videoUrl, videoBounds ).addTo(myMap);






