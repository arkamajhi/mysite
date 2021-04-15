import folium
import os
import json

#Create map object
m=folium.Map(location=[42.3601,-71.0589],zoom_start=12)

#Global tooltip
tooltip='Click for more'

#Create custom png Icon
logoIcon=folium.features.CustomIcon('logo.png',icon_size=(50,50))

#Vega data
vis=os.path.join('data','vis.json')

#Chora json
overlay=os.path.join('data','chora.json')

#Create markers
folium.Marker([42.363600,-71.099500],
              popup='<strong>Location 1</strong>',
              tooltip=tooltip).add_to(m),

folium.Marker([42.333600,-71.099500],
              popup='<strong>Location 2</strong>',
              tooltip=tooltip,
              icon=folium.Icon(icon='cloud',color='purple')).add_to(m),
folium.Marker([42.375140,-71.032450],
              popup='<strong>Location 3</strong>',
              tooltip=tooltip,
              icon=logoIcon).add_to(m),

folium.Marker([42.315140,-71.072450],
              popup=folium.Popup(max_width=450).add_child(folium.Vega(json.load(open(vis)),width=650,height=250))
              ).add_to(m)

#Circle Marker
folium.CircleMarker(
    location=[42.466470,-70.942110],
    radius=50,
    popup='My Birthplace',
    color='#428BCA',
    fill=True,
    fill_color='#428BCA',
).add_to(m)

#GeoJson Overlay
folium.GeoJson(overlay,name='chora').add_to(m)

#Generate map
m.save('map.html')
