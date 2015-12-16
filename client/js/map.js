(function() {
    L.mapbox.accessToken = "pk.eyJ1IjoiYnJicm93bmdlbyIsImEiOiJjYmVlMjEzNDhiYzcwZjU3ZmYwOGFmNzBkM2U1ZTcxMCJ9.o-fgdgUvU4Ks1k4TcrYhkw";
    var map = L.mapbox.map('map', 'mapbox.run-bike-hike', {
        maxZoom: 20,
        minZoom: 5
    });
    var defaultStyle = {
        width: 5,
        opacity:1
    };
    var poiStyle = {
        radius: 5,
        fillColor: $color["poi"],
        color: $color["poi"],
        weight: 1,
        opacity: 1,
        fillOpacity: 0.9
    };

    var commuteLyr = L.geoJson(null, {});
    map.addLayer(commuteLyr);
    queue()
        .defer(d3.json, './public/commute.topo.json')
        .defer(d3.json, "./public/poi.geo.json")
        .await(run);
    function run (e, commute, poi ) {
        function onEachFeature(feature, layer) {
            if (feature.properties && feature.properties.description) {
                layer.bindPopup(feature.properties.description)
            }
        }
        L.geoJson(poi, {onEachFeature: onEachFeature, pointToLayer: (f, latlng) => {return L.circleMarker(latlng, poiStyle)}}).addTo(map);
        var commuteTopo = topojson.feature(commute, commute.objects.commute);
        commuteLyr.addData(commuteTopo);
        var bounds = commuteLyr.getBounds();
        bounds._southWest.lat -= .01;
        map.fitBounds(bounds);
        commuteLyr.eachLayer(function(f, l) {
            var key = f.feature.properties.dest.toLowerCase();
            f.setStyle(defaultStyle)
                .setStyle({color: $color[key]});
            $(f._container).attr('id', key);
            $(f._container).css("opacity", ".5");
            f.on("mouseover", () => {
                (f => {$mapMouseOver(f)})(f);
            });
            f.on("mouseout", () => {
                (f => {$mapMouseOut(f)})(f);
            });
        })
    }
})();