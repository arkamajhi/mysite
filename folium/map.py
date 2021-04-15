import folium

#Create map object
m=folium.Map(location=[42.3601,-71.0589],zoom_start=12)

#Global tooltip
tooltip='Click for more'

#Create markers
folium.Marker([42.363600,-71.099500],
              popup='<strong>Location 1</strong>',
              tooltip=tooltip).add_to(m),

folium.Marker([42.333600,-71.099500],
              popup='<strong>Location 2</strong>',
              tooltip=tooltip,
              icon=folium.Icon(icon='cloud')).add_to(m),

#Generate map
m.save('map.html')
