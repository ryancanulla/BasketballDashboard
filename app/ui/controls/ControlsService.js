Ext.define('BasketballDashboard.ui.controls.ControlsService', {
    mixins: { observable: 'Ext.util.Observable' },

    inject:['gameStore'],

    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
    },

    updateTimeRemaining:function(newValue) {
        var newScope = {
                totalRecords: this.gameStore.count(),
                gameStore: this.gameStore,
                newValue: newValue
            };

        this.gameStore.clearFilter();

        this.gameStore.filterBy(function(record, id) {
            var index = this.gameStore.indexOf(record);
            return index < this.newValue;
        }, newScope);
    }
});