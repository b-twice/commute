(function() {
    L.mapbox.accessToken = "pk.eyJ1IjoiYnJicm93bmdlbyIsImEiOiJjYmVlMjEzNDhiYzcwZjU3ZmYwOGFmNzBkM2U1ZTcxMCJ9.o-fgdgUvU4Ks1k4TcrYhkw";
    var map = L.mapbox.map('map', 'mapbox.run-bike-hike', {
        maxZoom: 20,
        minZoom: 5
    });
    var defaultStyle = {
        width: 5,
        opacity: .5
    };
    var highlightStyle = {
        opacity: 1
    };
    var commuteLyr = L.geoJson(null, {});
    map.addLayer(commuteLyr);

    d3.json('./public/commute.topo.json', (e, d ) => {
        var commuteTopo = topojson.feature(d, d.objects.commute);
        commuteLyr.addData(commuteTopo);
        map.fitBounds(commuteLyr.getBounds());
        commuteLyr.eachLayer(function(f, l) {
            f.setStyle(defaultStyle);
            f.setStyle({color: $color[f.feature.properties.dest]});
            f.on("mouseover", function (e) {
                f.setStyle(highlightStyle);
                f.bringToFront();
            });
            f.on("mouseout", function(e) {
                f.setStyle(defaultStyle);
                f.bringToBack();
            })
        })
    } )
})();