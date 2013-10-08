Ext.define('BasketballDashboard.Application', {

    extend: 'Deft.mvc.Application',
    requires: [
        'Deft.mixin.Controllable',
        'Deft.mixin.Injectable',
        'BasketballDashboard.Viewport',
        'BasketballDashboard.store.GameStore',
        'BasketballDashboard.ui.controls.ControlsService',
        'BasketballDashboard.ui.shots.ShotsService'
    ],

    init: function() {

        Deft.Injector.configure({
            gameStore: 'BasketballDashboard.store.GameStore',
            controlsService: 'BasketballDashboard.ui.controls.ControlsService',
            shotsService: 'BasketballDashboard.ui.shots.ShotsService'
        });

        Ext.tip.QuickTipManager.init();
        Ext.create('BasketballDashboard.Viewport');
    }




});
