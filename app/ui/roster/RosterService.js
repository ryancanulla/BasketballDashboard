Ext.define('BasketballDashboard.ui.roster.RosterService', {
    mixins: { observable: 'Ext.util.Observable' },

    requires: ['BasketballDashboard.Const'],
    inject:['gameStore'],

    homeTeam: null,

    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
        this.gameStore.on('datachanged', this.onDataChanged, this);
    },

    onDataChanged:function() {
        this.updateRoster();
    },

    updateRoster:function() {
        var player, foul;

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

        this.gameStore.each(function(record, index) {

            if(record.get('team') === BasketballDashboard.Const.HOME_TEAM) {

                if(record.get('player') === '' && record.get('etype') === BasketballDashboard.Const.REBOUND) {
                    console.log(record.get('time'));
                }

                player = this.addPlayer(record.get('player'), this.homeTeam);

                if(record.get('etype') === BasketballDashboard.Const.FOUL) {
                    player.get('fouls').push(record);
                }
                else if(record.get('etype') === BasketballDashboard.Const.REBOUND) {
                    player.get('rebounds').push(record);
                }

            }
        }, this);


    },

    addPlayer: function(name, roster) {
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

    getRosterData: function() {
        var player,
            result = {
                homeTeam: Ext.create('Ext.data.JsonStore', {
                    id:'name',
                    fields: [
                        {name: 'name', type:'string'},
                        {name: 'points', type:'int'},
                        {name: 'rebounds', type:'int'},
                        {name: 'assists', type:'int'},
                        {name: 'fouls', type:'int'}
                    ]
                })
            };

        if(this.homeTeam) {
            this.homeTeam.each(function(record) {
                player = {
                    name: record.get('name'),
                    points: 0,
                    assists: 0,
                    rebounds: record.get('rebounds').length,
                    fouls: record.get('fouls').length
                }
                result.homeTeam.add(player)
            }, this);
        }

        return result;
    }
});
