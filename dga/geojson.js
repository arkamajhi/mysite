geoJson = Indsubdist;

const state = [];
const district = [];

for(var k in geoJson.features)
{
    state[k]=geoJson.features[k].properties.NAME2_;
    district[k]=geoJson.features[k].properties.NAME1_;
}
//console.log(state);

