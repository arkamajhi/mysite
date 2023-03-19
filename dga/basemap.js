const myMap = L.map('map').setView([21.5, 83], 5);


//https://stackoverflow.com/questions/9394190/leaflet-map-api-with-google-satellite-layer

const googlemap = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

const tileUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution= 'Map data &copy; OpenStreetMap contributors';
const osm = L.tileLayer(tileUrl,{attribution});

mapLink ='<a href="http://www.esri.com/">Esri</a>';
wholink ='i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
const esri = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: '&copy; '+mapLink+', '+wholink, maxZoom: 18,});

//const videoUrl = 'https://www.mapbox.com/bites/00188/patricia_nasa.webm';
//const videoBounds = [[ 32, -130], [ 13, -100]];
//L.videoOverlay(videoUrl, videoBounds ).addTo(myMap);

var baseMaps = {
    "Google Map": googlemap,
    "Open Street Map": osm,

    "ESRI": esri
};

/*
var overlayMaps = {
    "Cities": cities
};*/

//var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

var layerControl = L.control.layers(baseMaps).addTo(myMap);






