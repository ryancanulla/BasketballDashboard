Ext.define('BasketballDashboard.Application', {

    extend: 'Deft.mvc.Application',
    requires: [
        'Deft.mixin.Controllable',
        'Deft.mixin.Injectable',
        'BasketballDashboard.Viewport'
    ],

    init: function() {

        Deft.Injector.configure({
            gameStore:'BasketballDashboard.store.GameStore',
            filterService: 'BasketballDashboard.ui.filter.FilterService',
            scoreService: 'BasketballDashboard.ui.score.ScoreService'
        });

        Ext.tip.QuickTipManager.init();
        Ext.create('BasketballDashboard.Viewport');
    }

});
