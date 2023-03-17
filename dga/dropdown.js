var uniquestate = (state.filter((value, index, array) => array.indexOf(value) === index)).sort();
//console.log(uniquestate);

let selectstate = document.getElementById('state');
uniquestate.map( (lang, i) => {
    let opt = document.createElement("option");
    opt.value = lang; // the index
    opt.innerHTML = lang;
    selectstate.append(opt);
});

selectstate.addEventListener('change', display_district);
function display_district()
{
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

    let selectdistrict = document.getElementById('district');
    selectdistrict.innerHTML = "";

    uniquedistrict.map( (lang, i) => {
    let opt = document.createElement("option");
    opt.value = i; // the index
    opt.innerHTML = lang;
    selectdistrict.append(opt);
    });
}