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


function generateList()
{
    const ul=document.querySelector('.list');
    ul.innerHTML="";
    PHCList.forEach((PHC) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const a = document.createElement('a');
        const p = document.createElement('p');

        a.addEventListener('click', () => {
            flyToPHC(PHC);
        });

        div.classList.add('PHC-item');
        a.innerText = PHC.properties.name;
        a.href = "#";
        p.innerText = PHC.properties.address;

        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);
    });

}

//generateList();

function makePopupContent(phc){
    return `
        <div>
            <h4>${phc.properties.name}</h4>
            <p>${phc.properties.address}</p>
            <div class="phone-number">
                <a href="tel:${phc.properties.phone}">
                    ${phc.properties.phone}
                </a>
            </div>
        </div>
    `;
}

//function onEachFeature(feature, layer){layer.bindPopup(makePopupContent(feature), {closeButton:false, offset: L.point(0,-8)})}

var myIcon = L.icon({
    iconUrl: "marker.png",
    iconSize: [30,40]
});

const PHCsLayer = L.geoJSON(PHCList,{
    onEachFeature: function (feature, layer){layer.bindPopup(makePopupContent(feature), {closeButton:false, offset: L.point(0,-8)}).bindTooltip(feature.properties.name)},
    pointToLayer: function(feature, latlng){
        return L.marker(latlng,{icon: myIcon});
    }
});

PHCsLayer.addTo(myMap);


function flyToPHC(phc){
    const lat = phc.geometry.coordinates[1];
    const lng = phc.geometry.coordinates[0];
    myMap.flyTo([lat,lng], 14, {duration: 3});

    setTimeout(()=>{
        L.popup({closeButton:false, offset: L.point(0,-8)})
        .setLatLng([lat,lng])
        .setContent(makePopupContent(phc))
        .openOn(myMap);
    }, 2000);
}







function getColor(d){
    return d > 1000 ? 'red' : 'blue';
}

function style(feature){
    return{
        weight: 0.5,
        opacity: 1,
        color: 'grey',
        dashArray: '',
        fillOpacity: 0.1,
        fillColor: getColor(feature.properties.AREA_)
    }
}


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight:0.5,
        color:'#000000',
        dashArray:'',
        fillOpacity:0.7
    });

    if(!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
        layer.bringToFront();
    }

    //info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    //info.update();
}

function zoomToFeature(e) {
    myMap.fitBounds(e.target.getBounds());
}

function makePopupSubdistrict(SD){
    return `
        <div>
            <h4>${SD.properties.NAME1_}</h4>
            <p>${SD.properties.NAME2_}</p>
        </div>
    `;
}

function onEachFeature(feature, layer){
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
    layer.bindPopup(makePopupSubdistrict(layer.feature), {closeButton:false, offset: L.point(0,-8)});
    layer.bindTooltip(makePopupSubdistrict(layer.feature), {closeButton:false, offset: L.point(0,-8)});
}


var geojson = L.geoJSON(Indsubdist,{
    style: style,
    onEachFeature: onEachFeature
}).addTo(myMap);

/*
var polygon = L.polygon([
    [51.51, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
  ]).addTo(myMap);
  var m1 = L.marker([51.515, -0.07]); // Outside and north of polygon
  var m2 = L.marker([51.506, -0.06]); // In polygon, not on border
  var m2 = L.marker([51.505, -0.074]); // Inside polygon boundary box but outside of polygon.
  var m2 = L.marker([51.51, -0.067]); // On polygon border.

  console.log(polygon.contains(m1.getLatLng()));
  // ==> false
  console.log(polygon.contains(m2.getLatLng()));
  // ==> true
  console.log(polygon.contains(m3.getLatLng()));
  // ==> false
  console.log(polygon.contains(m4.getLatLng()));
  // ==> true
  */