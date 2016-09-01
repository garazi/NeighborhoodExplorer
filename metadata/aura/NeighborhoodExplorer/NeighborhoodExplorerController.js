({
    doInit: function(component, event, helper) {
        var date = new Date();
        date = date.getTime();
        console.log("Start: ", date)
        var foo = component.get("v.currentRecord");
        console.log("foo: ", foo)
            // helper.initializeIt(component, currentRecord);
    },
    recordUpdated: function(component, event, helper) {
        var date = new Date();
        date = date.getTime();
        console.log("End: ", date)
        var currentRecord = component.get("v.currentRecord");
        var searchTerm = component.get("v.defaultSearch");
        helper.getData(component, currentRecord, searchTerm);
    },
    updateLocation: function(component, event, helper) {
        var searchTerm = component.find("searchTerm").get("v.value");
        // component.set("v.location", searchTerm);
    },
    doSomething: function(component, event, helper) {
        // var tab = event.target;
        // var tabId = tab.get("v.id");
        // console.log("tab: ", tabId);
        var currentRecord = component.get("v.currentRecord");
        var searchTerm = "shopping";
        helper.getData(component, currentRecord, searchTerm);
    },
    selectedTabber : function(component, event, helper) {
        console.log('here')
    },
    showDetails : function(component, event, helper) {
        var selectedItem = event.currentTarget;
        console.log("it worked: ", selectedItem)
    },
    hideSpinner : function(component, event, helper) {
        helper.hideSpinner(component);
    }
})


// ({
//     createLazyContent : function (cmp, event, helper) {
//         var tab = event.target;
//         var tabId = tab.get('v.id');
//         switch (tabId) {
//             case 'badge':
//                 helper.injectComponent('demo:ExampleBadge', tab);
//                 break;
//             case 'button' :
//                 helper.injectComponent('demo:ExampleRegularButtons', tab);
//                 break;
//         }
//     }
// })