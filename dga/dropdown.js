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
}

selectdistrict.addEventListener('change', changed_district);

function changed_district()
{
    document.querySelectorAll('.phc-list').forEach(el => el.hidden = true);
}