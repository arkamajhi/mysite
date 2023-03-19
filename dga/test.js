var Listing = [];

const charData = './csv/DH.csv';
    d3.csv(charData).then(function(datapoints)
    {
        for(i=0;i<datapoints.length;i++)
        {
            Listing[i]=
            {
                "type": "Feature",
                "geometry":
                {
                    "type": "Point",
                    "coordinates": [parseFloat(datapoints[i].long), parseFloat(datapoints[i].lat)]
                },
                "properties":
                {
                    "name": datapoints[i].dh,
                    "district": datapoints[i].district,
                    "state": datapoints[i].state,
                    "address": datapoints[i].address,
                    "phone": datapoints[i].phone,
                    "map": datapoints[i].map
                }
            }
        };
    });
    console.log(Listing);