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
            map = L.map(mapElement, { zoomControl: true }).setView([recordLoc.latitude, recordLoc.longitude], 10);
            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles © Esri', reuseTiles: true }).addTo(map);
            component.set("v.mapObj", map);
            var orgLoc = L.marker([recordLoc.latitude, recordLoc.longitude]).addTo(map);
            // var fooLoc = L.marker([37.8361237, -122.5139523]).addTo(map);
            // var fooLoc = L.marker([37.828486,-122.40907]).addTo(map);
            // var fooLoc = L.marker([37.4440882,-122.0302674]).addTo(map);
            // var markersLayer = new L.FeatureGroup();
            // component.set("v.markersLayer", markersLayer);
        }
        var markers = component.get("v.markers");
        var markersLength = markers.length;
        for(var i=0; i<markersLength; i++) {
            var tmp = markers[i].location.latitude;
            console.log(i + ": " + tmp);
        }
        // console.log('map: ', map);
        // console.log(component.get("v.location"));
        // var loc = component.get("v.location");
        // if (loc) {
        //     var foo = component.get("v.location").split(',');
        //     console.log(foo[0])
        //     map.panTo([foo[0], foo[1]], { animate: false });
        // }
    }
})
