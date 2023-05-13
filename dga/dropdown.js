
document.querySelectorAll('.phc-list').forEach(el => el.hidden = true);

var uniquestate = (state.filter((value, index, array) => array.indexOf(value) === index)).sort();
//console.log(uniquestate);

let selectstate = document.getElementById('state');

let opt = document.createElement("option");
opt.innerHTML = "All States";
selectstate.append(opt);

uniquestate.map( (lang, i) => {
    let opt = document.createElement("option");
    opt.value = lang; // the index
    opt.innerHTML = lang;
    selectstate.append(opt);
});

selectstate.addEventListener('change', display_district);

let selectdistrict = document.getElementById('district');




function display_district()
{
    document.querySelectorAll('.phc-list').forEach(el => el.hidden = true);

    try {
        dhLayer.remove();
    } catch (error) {

    }

    selectdistrict.innerHTML = "";
    let opt = document.createElement("option");
    //opt.value = i; // the index
    opt.innerHTML = "All Districts";
    selectdistrict.append(opt);

    console.log(selectstate.value);


    var listdistict = [];

    for(var s in state)
    {
        if(selectstate.value==state[s])
        {
            listdistict[s] = district[s];
        }
    }

    var uniquedistrict = (listdistict.filter((value, index, array) => array.indexOf(value) === index)).sort();


    uniquedistrict.map( (lang, i) => {
    let opt = document.createElement("option");
    opt.value = lang; // the index
    opt.innerHTML = lang;
    selectdistrict.append(opt);
    });

    var layerControlElement_state = document.getElementsByClassName('leaflet-control-layers')[0];
    var state_checkbox = layerControlElement_state.getElementsByTagName('input')[0];
    if(!state_checkbox.checked)
    {
        state_checkbox.click();
        //console.log(state_checkbox.value);
    }

}

selectdistrict.addEventListener('change', changed_district);

function changed_district()
{
    document.querySelectorAll('.phc-list').forEach(el => el.hidden = true);

    try {
        dhLayer.remove();
    } catch (error) {

    }

    var layerControlElement_district = document.getElementsByClassName('leaflet-control-layers')[0];
    var district_checkbox = layerControlElement_district.getElementsByTagName('input')[1];
    if(!district_checkbox.checked)
    {
        district_checkbox.click();
        //console.log(district_checkbox.value);
    }
}