var dhLayer;
function updateList()
{
    document.querySelectorAll('.phc-list').forEach(el => el.hidden = false);

    console.log("generation_started");
    //const ul=document.querySelector('.list');
    const ul=document.getElementById('left-list');

    console.log(dhList);

    /*
    if(selectstate.value!="All States"&&selectstate.value!="")
    {
        if(selectstate.value==datapoints[i].state)
        {
            console.log("Found something from selected state. "+selectstate.value+" = "+datapoints[i].state);

            if(selectdistrict.value!="All Districts")
            {
                if(selectdistrict.value==datapoints[i].district)
                {
                    console.log("Found something from selected state and selected district. Oh Yeah !!!");
                    PushToList(datapoints,i);
                }
                {
                    //console.log("But not from selected state and district. "+selectdistrict.value+" != "+datapoints[i].district);
                }
            }
            else
            {
                console.log(selectstate.value+" state selected but none or all district selected");
                PushToList(datapoints,i);
            }
        }
        else
        {
            //console.log("Not from selected state");
        }
    }
    else
    {
        console.log("None or all state selected");
        PushToList(datapoints,i);
    }
    */




    dhList.forEach((PHC) => {
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


    var myIcon = L.icon({
        iconUrl: "marker.png",
        iconSize: [30,40]
    });

    dhLayer = L.geoJSON(dhList,{
        onEachFeature: function (feature, layer){layer.bindPopup(makePopupContent(feature), {closeButton:false, offset: L.point(0,-8)}).bindTooltip(feature.properties.name)},
        pointToLayer: function(feature, latlng){
            return L.marker(latlng,{icon: myIcon});
        }
    });

    dhLayer.addTo(myMap);

    //dhLayer.remove();
}


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

