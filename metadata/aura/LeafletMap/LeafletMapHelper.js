({
    createMap: function(component, recordLoc) {
        console.log('initial map creation');
        var homeIcon = L.icon({
            iconUrl: '/resource/homeIcon',
            iconSize: [36, 36]
        })
        var mapElement = component.find("leafletMap").getElement();
        var map = L.map(mapElement, { zoomControl: true }).setView([recordLoc.latitude, recordLoc.longitude], 14);
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles © Esri', reuseTiles: true }).addTo(map);
        // LS Team: 
        // component.set("v.mapObj", map);
        component._mapObj = map;
        var orgLoc = L.marker([recordLoc.latitude, recordLoc.longitude], { icon: homeIcon }).addTo(map);
        var markersLayer = new L.FeatureGroup();
        // LS Team:
        component._markers = markersLayer;
        // component.set("v.markers", markers);
        this.createMarkers(component, map);
    },
    createMarkers: function(component, map) {
        var cmpMarkers = component._markers;
        if (cmpMarkers) {
            cmpMarkers.clearLayers();
        }
        // this.clearMarkers(component);
        var markersLayer = new L.FeatureGroup();
        var markers = component.get("v.markers");
        var markersLength = markers.length;
        for (var i = 0; i < markersLength; i++) {
            var tmp = markers[i].location;
            var bizLoc = L.marker([tmp.latitude, tmp.longitude]).addTo(map);
            bizLoc.bindPopup("<b>" + markers[i].name + "</b>");
            markersLayer.addLayer(bizLoc);
        }
        // component.set("v.markersLayer", markersLayer);
        map.addLayer(markersLayer);
        component._markers = markersLayer;
    },
    clearMarkers: function(component) {
        var markers = component._markers;
        markers.clearLayers();
    }
})
