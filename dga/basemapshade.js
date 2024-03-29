geoJson = Indsubdist;

const state = [];
const district = [];

for(var k in geoJson.features)
{
    state[k]=geoJson.features[k].properties.NAME2_;
    district[k]=geoJson.features[k].properties.NAME1_;
}



function getColor(d){
    return d > 1000 ? 'red' : 'blue';
}

function style(feature){
    return{
        weight: 0.5,
        opacity: 1,
        color: 'black',
        dashArray: '',
        fillOpacity: 0.05,
        fillColor: getColor(feature.properties.AREA_)
    }
}






function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight:0.5,
        color:'#000000',
        dashArray:'',
        fillOpacity:0.5
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

var layerControl = L.control.layers().addTo(myMap);

var geojson_state = L.geoJSON(IndiaState,{
    style: ()=>{
        return{
            weight: 2,
            opacity: 1,
            color: 'black',
            dashArray: '',
            fillOpacity: 1,
            fillColor: 'transparent'
        }
    },
});
//geojson_state.addTo(myMap);
//.addTo(myMap);

var state_layer = L.layerGroup([geojson_state]);
layerControl.addOverlay(state_layer, "States");



var geojson = L.geoJSON(Indsubdist,{
    style: style,
    onEachFeature: onEachFeature
});
//.addTo(myMap);

var dist_layer = L.layerGroup([geojson]);
layerControl.addOverlay(dist_layer, "Districts");

layerControl.addTo(myMap);

//layerControl.addBaseLayer(baseMaps, "Base Maps").addTo(myMap);


var BasemapControl = L.control.layers(baseMaps).addTo(myMap);


