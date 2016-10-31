({
    getData: function(component, searchTerm) {
        $A.util.addClass(component.find('searchField'), 'slds-hide');
        $A.util.removeClass(component.find('searchField'), 'search');
        var selectedTab = component.find("searchTabGroup").get("v.selectedTabId");
        var objectType = component.get("v.sObjectName");
        var currentRecord = component.get("v.currentRecord");

        if (selectedTab === 'Search') {
            $A.util.removeClass(component.find('searchField'), 'slds-hide');
            $A.util.addClass(component.find('searchField'), 'search');
            searchTerm = component.find("searchTerm").get("v.value");
            component.set("v.resultList", []);
            if (searchTerm === null) {
                return;
            }
        }

        this.showSpinner(component);

        switch (objectType) {
            case 'Contact':
                var recordAddress = currentRecord.MailingStreet + ',' + currentRecord.MailingCity + ',' + currentRecord.MailingState;
                component.set("v.address", currentRecord.MailingStreet);
                break;
            case 'Account':
                var recordAddress = currentRecord.BillingStreet + ',' + currentRecord.BillingCity + ',' + currentRecord.BillingState;
                component.set("v.address", currentRecord.BillingStreet);
                break;
            case 'Property__c':
                var recordAddress = currentRecord.Address__c + ',' + currentRecord.City__c + ',' + currentRecord.State__c;
                component.set("v.address", currentRecord.Address__c);
                break;
            default:
                return '{"error": "This component cannot be used on this page type."}';
        }

        console.log('getting data for: ', recordAddress)
        var action = component.get("c.getListByAddress");
        action.setParams({
            "address": recordAddress,
            "searchTerm": searchTerm
        });
        action.setCallback(this, function(response) {
            var data = JSON.parse(response.getReturnValue());
            console.log("data: ", data);
            console.log("location: ", data.location);
            this.populateList(component, data);
        });
        action.setStorable();
        $A.enqueueAction(action);
    },
    populateList: function(component, data) {
        console.log("populating list");
        var loc = component.get("v.location");
        if (loc && loc.latitude === data.location.latitude) {
            console.log('same location')
            component.set("v.resultList", data.bizArray);
        } else {
            console.log('new location')
            component.set("v.location", data.location);
            component.set("v.resultList", data.bizArray);
        }

    },
    hideSpinner: function(component) {
        console.log("hiding the spinner");
        var spinner = component.find('spinner');
        $A.util.addClass(spinner, "slds-hide");
    },
    showSpinner: function(component) {
        console.log("showing the spinner");
        var spinner = component.find('spinner');
        $A.util.removeClass(spinner, "slds-hide");
    }
})
