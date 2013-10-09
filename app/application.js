Ext.define('BasketballDashboard.Application', {

    extend: 'Deft.mvc.Application',
    requires: [
        'Deft.mixin.Controllable',
        'Deft.mixin.Injectable',
        'BasketballDashboard.Viewport',
        'BasketballDashboard.store.GameStore',
        'BasketballDashboard.ui.filter.FilterService',
        'BasketballDashboard.ui.score.ScoreService',
        'BasketballDashboard.ui.shooting.ShootingService'
    ],

    init: function() {

        Deft.Injector.configure({
            gameStore:'BasketballDashboard.store.GameStore',
            filterService: 'BasketballDashboard.ui.filter.FilterService',
            scoreService: 'BasketballDashboard.ui.score.ScoreService',
            shootingService: 'BasketballDashboard.ui.shooting.ShootingService'
        });

        Ext.tip.QuickTipManager.init();
        Ext.create('BasketballDashboard.Viewport');
    }

});
