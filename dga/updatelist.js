var dhLayer;

var ul=document.getElementById('left-list');



function updateList()
{
    document.querySelectorAll('.phc-list').forEach(el => el.hidden = false);

    console.log("generation_started");
    //const ul=document.querySelector('.list');


    console.log(dhList);


    ul.innerHTML="";


    dhList.forEach((PHC) => {

        if(selectstate.value=="All States")
        {
            appendList(PHC);
        }
        else if(selectstate.value==PHC.properties.state)
        {
            if(selectdistrict.value=="All Districts")
            {
                appendList(PHC);
            }
            else if(selectdistrict.value==PHC.properties.district)
            {
                appendList(PHC);
            }
            else
            {
                //appendList(PHC);
            }
        }
        else
        {
            //appendList(PHC);
        }

    });





    const filteredFeatures = dhList.filter(item => {
        if(selectstate.value=="All States")
        {
            return true;
        }
        else if(selectstate.value==item.properties.state)
        {
            if(selectdistrict.value=="All Districts")
            {
                return true;
            }
            else if(selectdistrict.value==item.properties.district)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    });
    console.log("filteredFeatures");
    console.log(filteredFeatures);


    var myIcon = L.icon({
        iconUrl: "marker.png",
        iconSize: [30,40]
    });

    dhLayer = L.geoJSON(filteredFeatures,
    {
        onEachFeature: function (feature, layer)
        {
            layer
            .bindPopup(makePopupContent(feature),{closeButton:false, offset: L.point(0,-8)})
            .bindTooltip(feature.properties.name)
        },
        pointToLayer: function(feature, latlng)
        {
            return L.marker(latlng,{icon: myIcon});
        }
    });

    dhLayer.addTo(myMap);

    //dhLayer.remove();



}




function appendList(PHC)
{
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

