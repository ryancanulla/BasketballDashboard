Ext.define('BasketballDashboard.ui.bubble.BubbleService', {
    mixins: { observable: 'Ext.util.Observable' },

    requires: [
        'BasketballDashboard.Const',
        'BasketballDashboard.ui.bubble.BubbleModel'
    ],
    inject:['gameStore', 'rosterService'],

    homeTeam: null,
    awayTeam: null,

    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
        this.gameStore.on('datachanged', this.onDataChanged, this);
    },

    onDataChanged:function() {
        this.updateRoster();
    },

    updateRoster:function() {
//        var stats = this.rosterService.getCurrentLineupSnapshot();
        var stats = this.rosterService.getStatsSnapshot();

        this.homeTeam = Ext.create('Ext.data.JsonStore', {
            model: 'BasketballDashboard.ui.bubble.BubbleModel',
            data: [ { name: '', value: '' } ]
        });

        this.awayTeam = Ext.create('Ext.data.JsonStore', {
            model: 'BasketballDashboard.ui.bubble.BubbleModel',
            data: [ { name: '', value: '' } ]
        });

        this.gameStore.each(function(record) {
            if(record.get('team') === BasketballDashboard.Const.HOME_TEAM) {

                this.homeTeam.getAt(0).set('name', BasketballDashboard.Const.HOME_TEAM);
                this._buildReboundBubbleData(this.homeTeam.getAt(0), stats.homeTeam);

            }
            else if(record.get('team') === BasketballDashboard.Const.AWAY_TEAM) {
                this.awayTeam.getAt(0).set('name', BasketballDashboard.Const.AWAY_TEAM);
                this._buildReboundBubbleData(this.awayTeam.getAt(0), stats.awayTeam);
            }
        }, this);
    },

    _buildReboundBubbleData: function(team, stats) {
        team.set('value', 100);
        team.set('children', []);

        stats.each(function(record) {
            var newRecord = {
                name: record.get('name'),
                value: record.get('rebounds')
            };
            this.get('children').push(newRecord);
        }, team);
    },

    getPlayerData:function() {
        var result = {
                homeTeam: this.homeTeam,
                awayTeam: this.awayTeam
            };

        return result;
    }

});