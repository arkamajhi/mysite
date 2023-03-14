const map = L.map('map').setView([22.9074872, 79.07306671], 5);
const tileUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '';
const tiles = L.tileLayer(tileUrl,{attribution});
tiles.addTo(map);

const CLayer = L.circle([22.9074872, 79.07306671],{radius:20000, color:'coral', fillColor:'green'});
CLayer.addTo(map);

const bounds = [[54.559322,-5.767822],[56.1210604,-3.021240]];
const rectangle = L.rectangle(bounds);
rectangle.addTo(map);

const bTriangle = [
    [
        [25.774,-80.19],
        [18.466,-66.118],
        [32.321,-64.757]
    ]
];
const polygon = L.polygon(bTriangle);
polygon.addTo(map);


const latlngs = [
    [45.51, -122.68],
    [37.77, -122.43],
    [34.04, -118.2]
];
const polyline = L.polyline(latlngs, {});
polyline.addTo(map);

const marker=[18.920675417289807,72.82952788802635];
const cMarker = L.circleMarker(marker);
cMarker.addTo(map);