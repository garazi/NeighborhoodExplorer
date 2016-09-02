({
    doInit: function(component, event, helper) {
        console.log('firing Leaflet doInit');
    },
    updateMap: function(component, event, helper) {
        console.log('updateMap called')
        var map = component.get("v.mapObj");
        var markersLayer = component.get("v.markersLayer");
        var recordLoc = component.get("v.location");
        if (!map) {
            var homeIcon = L.icon({
                iconUrl: '/resource/homeIcon',
                iconSize: [36, 36]
            })
            var mapElement = component.find("leafletMap").getElement();
            map = L.map(mapElement, { zoomControl: true }).setView([recordLoc.latitude, recordLoc.longitude], 14);
            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles © Esri', reuseTiles: true }).addTo(map);
            component.set("v.mapObj", map);
            var orgLoc = L.marker([recordLoc.latitude, recordLoc.longitude], {icon: homeIcon}).addTo(map);
            // var fooLoc = L.marker([37.8361237, -122.5139523]).addTo(map);
            // var fooLoc = L.marker([37.828486,-122.40907]).addTo(map);
            // var fooLoc = L.marker([37.4440882,-122.0302674]).addTo(map);
            markersLayer = new L.FeatureGroup();
            component.set("v.markersLayer", markersLayer);
        }
        console.log("map: ", map);
        if (markersLayer) {
            console.log("clearing layers")
            var foo = markersLayer.getLayers();
            // markersLayer.clearLayers();
        }
        var markers = component.get("v.markers");
        var markersLength = markers.length;
        for(var i=0; i<markersLength; i++) {
            var tmp = markers[i].location;
            var bizLoc = L.marker([tmp.latitude, tmp.longitude]).addTo(map);
            markersLayer.addLayer(bizLoc);
        }
        component.set("v.markersLayer", markersLayer);
        map.addLayer(markersLayer);
    },
    panTo : function(component,event,helper) {
        var map = component.get("v.mapObj");
        var center = component.get("v.mapCenter")
        map.panTo([center.latitude, center.longitude]);
    }
})
