({
    doInit: function(component, event, helper) {
        var date = new Date();
        date = date.getTime();
        console.log("Start: ", date);
        var foo = component.get("v.sObjectName");
        console.log('foo: ', component.get("v.sObjectName"));
        var tabNames = component.get("v.tabs");
        tabNames = tabNames.split(',');
        tabNames.push("Search");
        component.set("v.tabNames", tabNames);
        component.set("v.defaultSearch", tabNames[0]);
    },
    doLookup: function(component, event, helper) {
        var date = new Date();
        date = date.getTime();
        console.log("End: ", date);       
        var searchTerm = component.get("v.defaultSearch");
        helper.getData(component, searchTerm);
    },
    selectedTab: function(component, event, helper) {
        var tab = event.detail.selectedTab;
        var tabId = tab.get("v.id");
        component.set("v.defaultSearch", tabId);
        var searchTerm = component.get("v.defaultSearch");
        helper.getData(component, searchTerm);
    },
    updateSearch: function(component, event, helper) {
        var searchTerm = component.find("searchTerm").get("v.value");
        helper.getData(component, searchTerm);
    },
    showDetails: function(component, event, helper) {
        var closeItem = component.get('v.openItem');
        if (closeItem) {
            closeItem = closeItem.querySelector('[data-details]');
            $A.util.addClass(closeItem, 'slds-hide');
        }
        var selectedItem = event.currentTarget;
        component.set('v.openItem', selectedItem);
        var itemDetails = selectedItem.querySelector('[data-details]');
        $A.util.removeClass(itemDetails, 'slds-hide');

        var data = component.get('v.resultList');
        var recID = selectedItem.dataset.record;
        component.set("v.mapCenter", data[recID].location);
        var tmp = component.get("v.mapCenter")
    },
    hideSpinner: function(component, event, helper) {
        helper.hideSpinner(component);
    },
    sortNear: function(component, event, helper) {
        var tmp = component.get("v.resultList");
        tmp.sort(function(a, b) {
            if (a.distance > b.distance) {
                return 1;
            }
            if (a.distance < b.distance) {
                return -1;
            }
            // a isequal to b
            return 0;
        });
        component.set("v.resultList", tmp);
    },
    sortFar: function(component, event, helper) {
        var tmp = component.get("v.resultList");
        tmp.sort(function(a, b) {
            if (a.distance < b.distance) {
                return 1;
            }
            if (a.distance > b.distance) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        component.set("v.resultList", tmp);
    },
    handleSelect: function(component, event, helper) {
        var menuItem = event.target;
        console.log("this: ", menuItem.get("v.label"));
    }
})
