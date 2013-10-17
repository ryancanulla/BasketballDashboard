Ext.define('BasketballDashboard.Application', {

    extend: 'Deft.mvc.Application',
    requires: [
        'Deft.mixin.Controllable',
        'Deft.mixin.Injectable',
        'BasketballDashboard.Viewport',
        'BasketballDashboard.store.GameStore',
        'BasketballDashboard.ui.filter.FilterService',
        'BasketballDashboard.ui.score.ScoreService',
        'BasketballDashboard.ui.shooting.ShootingService',
        'BasketballDashboard.ui.time.TimeService',
        'BasketballDashboard.ui.roster.RosterService',
        'BasketballDashboard.ui.court.CourtService'
    ],

    init: function() {

        Deft.Injector.configure({
            gameStore:'BasketballDashboard.store.GameStore',
            filterService: 'BasketballDashboard.ui.filter.FilterService',
            scoreService: 'BasketballDashboard.ui.score.ScoreService',
            shootingService: 'BasketballDashboard.ui.shooting.ShootingService',
            timeService: 'BasketballDashboard.ui.time.TimeService',
            rosterService: 'BasketballDashboard.ui.roster.RosterService',
            courtService: 'BasketballDashboard.ui.court.CourtService'
        });

        Ext.tip.QuickTipManager.init();
        Ext.create('BasketballDashboard.Viewport');
    }

});
