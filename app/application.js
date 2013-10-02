Ext.define('BasketballDashboard.Application', {

    extend: 'Deft.mvc.Application',
    requires: [
        'Deft.mixin.Controllable',
        'Deft.mixin.Injectable',
        'BasketballDashboard.Viewport',
        'BasketballDashboard.store.GameStore'
    ],

    init: function() {

        Deft.Injector.configure({
            gameStore: 'BasketballDashboard.store.GameStore',
            controlsService: 'BasketballDashboard.ui.controls.ControlsService'
        });

        Ext.tip.QuickTipManager.init();
        Ext.create('BasketballDashboard.Viewport');
    }

});
