Ext.define("BasketballDashboard.ui.filter.FilterController", {
    extend: "Deft.mvc.ViewController",

    inject:['filterService'],

    observe: {
        scoreboardService: {
            scoreboardChangedEvent: 'updateDisplay'
        }
    },

    control: {
        timeScrubber: {
            changecomplete: 'onTimeScrubberChanged'
//            change: 'onTimeScrubberChanged'
        }
    },

    init: function() {
        this.callParent(arguments);
    },

    onTimeScrubberChanged:function(element, newValue) {
        this.filterService.updateTimeRemaining(newValue);
    }
});
