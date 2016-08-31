({
    getData: function(component, recordAddress, searchTerm) {
        this.showSpinner(component);
        var recordAddress = recordAddress.MailingStreet + ',' + recordAddress.MailingCity + ',' + recordAddress.MailingState
        console.log('getting data for: ', recordAddress)
        var action = component.get("c.getListByAddress");
        action.setParams({
            "address": recordAddress,
            "searchTerm": searchTerm
        });
        action.setCallback(this, function(response) {
            var data = JSON.parse(response.getReturnValue());
            console.log("data: ", data);
            component.set("v.resultList", data.bizArray);
            this.populateList(component);
        });
        action.setStorable();
        $A.enqueueAction(action);
    },
    populateList: function(component) {
        console.log("populating list");
        // this.hideSpinner(component);
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
