(function() {
    L.mapbox.accessToken = "pk.eyJ1IjoiYnJicm93bmdlbyIsImEiOiJjYmVlMjEzNDhiYzcwZjU3ZmYwOGFmNzBkM2U1ZTcxMCJ9.o-fgdgUvU4Ks1k4TcrYhkw";
    const northEast = L.latLng(37.560330016090184, -77.40550518035889),
        southWest = L.latLng(37.532667026219166, -77.4851131439209),
        bounds = L.latLngBounds(southWest, northEast);
    var map = L.mapbox.map('map', 'mapbox.dark', {
        maxBounds: bounds,
        maxZoom: 19,
        minZoom: 15
    });
    var commuteLyr = L.geoJson(null, { style: { color: '#333', weight: 1 }});
    map.fitBounds(bounds);
    map.addLayer(commuteLyr);
    d3.json('./public/bike_commute.topo.json', (e, d ) => {
        var commuteTopo = topojson.feature(d, d.objects.commute);
        commuteLyr.addData(commuteTopo);
    } )
})();