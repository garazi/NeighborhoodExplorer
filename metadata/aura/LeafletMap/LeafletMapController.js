({
    doInit: function(component, event, helper) {
        console.log('firing Leaflet doInit');
    },
    mapLoaded: function(component, event, helper) {
        console.log('started Leaflet mapping');
        // var map = component.get("v.mapObj");
        // var mapElement = component.find("leafletMap").getElement();
        // map = L.map(mapElement, { zoomControl: true }).setView([37.5116062, -122.196844], 10);
        // L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles © Esri', reuseTiles: true }).addTo(map);
        // component.set("v.mapObj", map);
        // var orgLoc = L.marker([37.5116062, -122.196844]).addTo(map);
        // var fooLoc = L.marker([37.8361237, -122.5139523]).addTo(map);
        // // var fooLoc = L.marker([37.828486,-122.40907]).addTo(map);
        // // var fooLoc = L.marker([37.4440882,-122.0302674]).addTo(map);
        // var markers = new L.FeatureGroup();
        // component.set("v.markers", markers);
    },
    updateMap: function(component, event, helper) {
        console.log('updateMap called')
            // component.set("v.mapObj", "");
        var map = component.get("v.mapObj");
        var recordLoc = component.get("v.location");
        if (!map) {
            var mapElement = component.find("leafletMap").getElement();
            map = L.map(mapElement, { zoomControl: true }).setView([recordLoc.latitude, recordLoc.longitude], 14);
            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles © Esri', reuseTiles: true }).addTo(map);
            component.set("v.mapObj", map);
            var orgLoc = L.marker([recordLoc.latitude, recordLoc.longitude]).addTo(map);
            // var fooLoc = L.marker([37.8361237, -122.5139523]).addTo(map);
            // var fooLoc = L.marker([37.828486,-122.40907]).addTo(map);
            // var fooLoc = L.marker([37.4440882,-122.0302674]).addTo(map);
            var markersLayer = new L.FeatureGroup();
            component.set("v.markersLayer", markersLayer);
        }
        var markers = component.get("v.markers");
        var markersLength = markers.length;
        for(var i=0; i<markersLength; i++) {
            var tmp = markers[i].location;
            console.log(i + ": " + tmp);
            var bizLoc = L.marker([tmp.latitude, tmp.longitude]).addTo(map);
            markersLayer.addLayer(bizLoc);
        }
        map.addLayer(markersLayer);
    }
})
