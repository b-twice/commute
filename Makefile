CONTOURS = ftp://ftp.ci.richmond.va.us/GIS/Shapefiles/Contours/Contours.zip
CENTERLINES = ftp://ftp.ci.richmond.va.us/GIS/Shapefiles/Centerlines/Centerlines.zip

commute:data/commute.topo.json
elevation:data/elevation.topo.json
contours:data/shp/Contours_4326.shp
centerlines:data/shp/route_centerlines.shp

clean:
	rm -rf -- data


### COMMUTE
data/commute.topo.json:data/commute.geo.json
	topojson -o $@ \
	--properties dest=Dest \
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

### CENTERLINES SRC

data/shp/route_centerlines.shp:data/shp/Centerlines.shp
	ogr2ogr -f "ESRI Shapefile" \
	-sql "SELECT * FROM Centerlines WHERE RouteName IN ('W Grace St', 'Bank St', 'W Franklin St', 'N 9th St', 'E Franklin St', 'E Grace St', 'N 15th St', 'N Harrison St', 'S 15th St')" \
	$@ $<


data/shp/Centerlines.shp:data/zip/Centerlines.zip
	mkdir -p $(dir $@)
	unzip -d data/shp $<
	touch $@

data/zip/Centerlines.zip:
	mkdir -p $(dir $@)
	wget "$(CENTERLINES)" -O $@.download
	mv $@.download $@

### CONTOURS SRC

data/shp/Contours_4326.shp:data/shp/Contours.shp
	ogr2ogr -f "ESRI SHAPEFILE" \
	-t_srs EPSG:4326 \
	$@ $<

data/shp/Contours.shp:data/zip/Contours.zip
	mkdir -p $(dir $@)
	unzip -d data/shp $<
	touch $@

data/zip/Contours.zip:
	mkdir -p $(dir $@)
	wget "$(CONTOURS)" -O $@.download
	mv $@.download $@