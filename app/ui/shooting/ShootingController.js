Ext.define("BasketballDashboard.ui.shooting.ShootingController", {
    extend: "Deft.mvc.ViewController",

    requires: [
        'Ext.chart.series.Pie',
        'BasketballDashboard.ui.shooting.ShootingConst'
    ],

    inject:['shootingService'],

    observe: {
        shootingService: {
            updatedEvent: 'updateStore'
        }
    },

    control: {
        topShootersChart: {
            chartItemClick: 'showPlayerShotData'
        },
        backButton: {
            click: 'showRosterShotData'
        },
        pointsButton:{
            click: 'showRosterByPoints'
        },
        totalShotsButton:{
            click: 'showRosterByTotalShots'
        },
        madeShotsButton: {
            click: 'showRosterByMadeShots'
        },
        missedShotsButton: {
            click: 'showRosterByMissedShots'
        }
    },

    team:null,
    ROSTER_VIEW: 'rosterView',
    PLAYER_VIEW: 'playerView',
    currentView: null,

    init: function() {
        this.callParent(arguments);
        this.team = this.getView().team;
        this.currentView = this.ROSTER_VIEW;
    },

    updateStore:function() {
        if(this.currentView === this.ROSTER_VIEW) {
            this.showRosterShotData();
        }
        else {
            this.showPlayerShotData();
        }
    },

    showRosterByPoints:function() {
        this.updateChart(BasketballDashboard.ui.shooting.ShootingConst.POINTS);
    },

    showRosterByTotalShots:function() {
        this.updateChart(BasketballDashboard.ui.shooting.ShootingConst.TOTAL_SHOTS);
    },

    showRosterByMadeShots: function() {
        this.updateChart(BasketballDashboard.ui.shooting.ShootingConst.MADE_SHOTS);
    },

    showRosterByMissedShots: function() {
        this.updateChart(BasketballDashboard.ui.shooting.ShootingConst.MISSED_SHOTS);
    },

    updateChart:function(newField) {
        var me = this,
            series = this.getTopShootersChart().series.first();
        series.angleField = newField;

        series.tipConfig.renderer = function(storeItem, item) {
            this.setTitle(storeItem.get('name') + ': ' + storeItem.get(newField) + me.getFieldDescription(newField));
        }

        if(this.currentView === this.PLAYER_VIEW) {
            series.tipConfig.renderer = function(storeItem, item) {
                this.setTitle(storeItem.get('total') + ' ' + me.getFieldDescription(storeItem.get('name')));
            }
        }

        this.getTopShootersChart().getStore().sort(newField, 'DESC');
        this.getTopShootersChart().redraw();
    },

    showRosterLevelButtons:function() {
        this.getPointsButton().show();
        this.getTotalShotsButton().show();
        this.getMadeShotsButton().show();
        this.getMissedShotsButton().show();

        this.getBackButton().hide();
    },

    showPlayerLevelButtons:function() {
        this.getPointsButton().hide();
        this.getTotalShotsButton().hide();
        this.getMadeShotsButton().hide();
        this.getMissedShotsButton().hide();

        this.getBackButton().show();
    },

    getFieldDescription:function(field) {
        var result='';

        switch(field) {
            case BasketballDashboard.ui.shooting.ShootingConst.POINTS:
                result = ' points';
                break;
            case BasketballDashboard.ui.shooting.ShootingConst.TOTAL_SHOTS:
                result = ' attempts';
                break;
            case BasketballDashboard.ui.shooting.ShootingConst.MADE_SHOTS:
                result = ' baskets';
                break;
            case BasketballDashboard.ui.shooting.ShootingConst.MISSED_SHOTS:
                result = ' misses';
                break;
        }
        return result;
    },

    showPlayerShotData:function(event) {
        var newStore = this.shootingService.getPlayerShotData(this.team, event.storeItem.get('name'));
        this.getTopShootersChart().bindStore(newStore);

        this.updateChart('total', true);
        this.showPlayerLevelButtons();
    },

    showRosterShotData:function(event) {
        var newStore = this.shootingService.getRosterShotData(this.team);
        this.getTopShootersChart().bindStore(newStore);

        this.updateChart(BasketballDashboard.ui.shooting.ShootingConst.POINTS);
        this.showRosterLevelButtons();
    }
});
