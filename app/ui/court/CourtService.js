Ext.define('BasketballDashboard.ui.court.CourtService', {
    mixins: { observable: 'Ext.util.Observable' },

    requires: [
        'BasketballDashboard.Const',
        'BasketballDashboard.ui.roster.RosterModel'
    ],
    inject:['gameStore'],

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
        this.homeTeam = Ext.create('Ext.data.JsonStore', { model:'BasketballDashboard.model.GameEventModel' });
        this.awayTeam = Ext.create('Ext.data.JsonStore', { model:'BasketballDashboard.model.GameEventModel' });

        this.gameStore.each(function(record, index) {
            if(record.get('team') === BasketballDashboard.Const.HOME_TEAM) {
                this._buildRosterData(record, this.homeTeam);
            }
            else if(record.get('team') === BasketballDashboard.Const.AWAY_TEAM) {
                this._buildRosterData(record, this.awayTeam);
            }
        }, this);
    },

    _buildRosterData:function(record, team) {
        if(record.get('etype') === BasketballDashboard.Const.SHOT || record.get('etype') === BasketballDashboard.Const.FREE_THROW) {
            team.add(record);
        }
    },

    getAllShots: function() {
        var result = {
            homeTeam: this.homeTeam,
            awayTeam: this.awayTeam
        };

        return result;
    }

});