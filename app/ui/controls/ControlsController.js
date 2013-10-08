Ext.define("BasketballDashboard.ui.controls.ControlsController", {
    extend: "Deft.mvc.ViewController",

    require: ['BasketballDashboard.ui.controls.ControlsService'],

    inject:['controlsService'],

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
        this.controlsService.updateTimeRemaining(newValue);
    }
});
