Ext.define('BasketballDashboard.ui.roster.RosterService', {
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

        this.homeTeam = Ext.create('Ext.data.JsonStore', {
            id:'name',
            fields: [
                {name: 'name', type:'string'},
                {name: 'points', type:'auto'},
                {name: 'rebounds', type:'auto'},
                {name: 'assists', type:'auto'},
                {name: 'fouls', type:'auto'}
            ]
        });

        this.awayTeam = Ext.create('Ext.data.JsonStore', {
            id:'name',
            fields: [
                {name: 'name', type:'string'},
                {name: 'points', type:'auto'},
                {name: 'rebounds', type:'auto'},
                {name: 'assists', type:'auto'},
                {name: 'fouls', type:'auto'}
            ]
        });

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
        var player = this._addPlayer(record.get('player'), team);

        if(record.get('etype') === BasketballDashboard.Const.FOUL) {
            player.get('fouls').push(record);
        }
        else if(record.get('etype') === BasketballDashboard.Const.REBOUND) {
            player.get('rebounds').push(record);
        }
        else if(record.get('etype') === BasketballDashboard.Const.SHOT || record.get('etype') === BasketballDashboard.Const.FREE_THROW) {
            player.get('points').push(record);
        }
    },

    _addPlayer: function(name, roster) {
        var player = roster.findRecord('name', name);

        if(name && !player) {
            var newPlayer = {
                name: name,
                points: [],
                rebounds: [],
                assists: [],
                fouls: []
            };
            player = roster.add(newPlayer)[0];
        }
        return player
    },

    getStatsSnapshot: function() {
        var result = {
                homeTeam: Ext.create('Ext.data.JsonStore', { model:'BasketballDashboard.ui.roster.RosterModel' }),
                awayTeam: Ext.create('Ext.data.JsonStore', { model:'BasketballDashboard.ui.roster.RosterModel' })
            };

        if(this.homeTeam) {
            this._buildStatsSnapshot(this.homeTeam, result.homeTeam);
        }

        if(this.awayTeam) {
            this._buildStatsSnapshot(this.awayTeam, result.awayTeam);
        }

        return result;
    },

    _buildStatsSnapshot: function(rosterData, result) {
        var player;

        rosterData.each(function(record) {
            player = Ext.create('BasketballDashboard.ui.roster.RosterModel', {
                name: record.get('name'),
                points: 0,
                assists: 0,
                rebounds: record.get('rebounds').length,
                fouls: record.get('fouls').length
            });
            result.add(player)
        }, this);
    },

    getCurrentLineupSnapshot: function() {
        var result = this.getStatsSnapshot(),
            gameState = this.gameStore.last(),
            lineup = [];

        if(gameState) {

            lineup.push(gameState.get('h1'), gameState.get('h2'), gameState.get('h3'), gameState.get('h4'), gameState.get('h5'));
            this._filterBenchPlayers(lineup, result.homeTeam);

            lineup = [];
            lineup.push(gameState.get('a1'), gameState.get('a2'), gameState.get('a3'), gameState.get('a4'), gameState.get('a5'));
            this._filterBenchPlayers(lineup, result.awayTeam);
        }

        return result;
    },

    _filterBenchPlayers:function(lineup, team) {
        team.filterBy(function(record) {
            return this.lineup.indexOf(record.get('name')) !== -1;
        }, { lineup: lineup});
    }
});
