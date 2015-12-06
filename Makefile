commute:data/commute.topo.json
elevation:data/elevation.topo.json
clean:
	rm -rf -- data


### COMMUTE
data/commute.topo.json:data/commute.geo.json
	topojson -o $@ \
	-- \
	commute=$<

data/commute.geo.json:data/shp/bike_commute.shp
	ogr2ogr -f GeoJSON \
	-t_srs EPSG:4326 \
	$@ $<

### ELEVATION

data/elevation.topo.json:data/elevation.geo.json
	topojson -o $@ \
	-- \
	commute=$<

data/elevation.geo.json:data/shp/contours_nom2.shp
	ogr2ogr -f GeoJSON \
	-t_srs EPSG:4326 \
	$@ $<

