import folium
import pandas as pd
import os

states=os.path.join('data','us-states.json')
unemployment_data=os.path.join('data','us_unemployment.csv')
state_data=pd.read_csv(unemployment_data)

m=folium.Map(location=[48,-102],zoom_start=3,tiles='stamentoner')

"""
Availble Folium 'tiles':
tiles = 'cartodbdark_matter',
'cartodbpositron',
'cartodbpositronnolabels',
'cartodbpositrononlylabels',
'cloudmade',
'mapbox',
'mapboxbright',
'mapboxcontrolroom',
'openstreetmap',
'stamenterrain',
'stamentoner',
'stamentonerbackground',
'stamentonerlabels',
'stamenwatercolor'.
"""

m.choropleth(
    geo_data=states,
    name='choropleth',
    data=state_data,
    columns=['State','Unemployment'],
    key_on='feature.id',
    fill_color='YlOrRd',
    fill_opacity=0.7,
    line_opacity=0.2,
    legend_name='Umemployment Rate %',
)

folium.LayerControl().add_to(m)

m.save('map2.html')
