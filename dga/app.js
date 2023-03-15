const myMap = L.map('map').setView([22.9074872, 79.07306671], 5);

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
    storeList.forEach((shop) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const a = document.createElement('a');
        const p = document.createElement('p');

        a.addEventListener('click', () => {
            flyToStore(shop);
        });

        div.classList.add('shop-item');
        a.innerText = shop.properties.name;
        a.href = "#";
        p.innerText = shop.properties.address;

        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);
    });
    shopsLayer.addTo(myMap);
}

//generateList();

function makePopupContent(shop){
    return `
        <div>
            <h4>${shop.properties.name}</h4>
            <p>${shop.properties.address}</p>
            <div class="phone-number">
                <a href="tel:${shop.properties.phone}">
                    ${shop.properties.phone}
                </a>
            </div>
        </div>
    `;
}

function onEachFeature(feature, layer){
    layer.bindPopup(makePopupContent(feature), {closeButton:false, offset: L.point(0,-8)});
}

var myIcon = L.icon({
    iconUrl: "marker.png",
    iconSize: [30,40]
});

const shopsLayer = L.geoJSON(storeList,{
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng){
        return L.marker(latlng,{icon: myIcon});
    }
});


function flyToStore(store){
    const lat = store.geometry.coordinates[1];
    const lng = store.geometry.coordinates[0];
    myMap.flyTo([lat,lng], 14, {duration: 3});

    setTimeout(()=>{
        L.popup({closeButton:false, offset: L.point(0,-8)})
        .setLatLng([lat,lng])
        .setContent(makePopupContent(store))
        .openOn(myMap);
    }, 2000);
}

function getColor(d)
{
    return d > 100 ? "#a63603" :
        d > 200 ? "#e6550d" :
            d > 300 ? "#fd8d3c";
}

function style(feature)
{
    weight: 1,
    opacity: 1,
    color: 'grey',
    dashArray: '',
    fillOpacity: 0.9,
    fillColor: getColor(feature.properties.LENGTH_)
}

const geojson = L.geoJSON(Indsubdist,{
    style: style
}).addTo(myMap);