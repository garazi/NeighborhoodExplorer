({
    doInit: function(component, event, helper) {
        console.log('firing Leaflet doInit');
    },
    updateMap: function(component, event, helper) {
        console.log('updateMap called')
        var recordLoc = component.get("v.location");
        // LS Team:
        // var map = component.get("v.mapObj");
        var map = component._mapObj;
        if (!map) {
            helper.createMap(component, recordLoc)
        } else {
            helper.createMarkers(component, map);
        }        
    },
    panTo: function(component, event, helper) {
        // var map = component.get("v.mapObj");
        var map = component._mapObj;
        var center = component.get("v.mapCenter")
        map.panTo([center.latitude, center.longitude]);
    }
})