Ext.define('BasketballDashboard.ui.shots.ShotsService', {
    mixins: { observable: 'Ext.util.Observable' },

    inject:['gameStore'],
    requires: [
        'Ext.data.JsonStore',
        'BasketballDashboard.ui.shots.ShotsModel'
    ],

    UPDATED:'updatedEvent',

    topShooters:null,

    // SHOT TYPES
    THREE_POINT:'3pt',
    DRIVING_LAYUP:'driving layup',
    FADE_AWAY_JUMPER:'fade away jumper',
    JUMP:'jump',
    LAYUP:'layup',
    PULLUP_JUMP:'pullup jump',
    STEP_BACK_JUMP:'step back jump',

    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
        this.gameStore.on('datachanged', this.onDataChanged, this);
    },

    onDataChanged:function() {
        this.fireEvent(this.UPDATED);
    },

    buildRoster:function(team) {
        var roster = Ext.create('Ext.data.JsonStore', {
                id:'name',
                fields: [
                    {name: 'name', type:'string'},
                    {name: 'shots', type:'auto'}
                ]
            }),
            shot;

        this.gameStore.each(function(record) {
            var player;

            if(record.data.etype === 'shot' && record.data.team === team) {
                player = roster.findRecord('name', record.get('player'));

                if(!player) {
                    var newPlayer = {
                        name:record.get('player'),
                        shots: Ext.create('Ext.data.JsonStore', {
                            model:'BasketballDashboard.ui.shots.ShotsModel'
                        })
                    };

                    player = roster.add(newPlayer)[0];
                }

                shot = Ext.create('BasketballDashboard.ui.shots.ShotsModel', {
                    player: record.get('player'),
                    type: record.get('type'),
                    points: record.get('points'),
                    assist: record.get('assist'),
                    period: record.get('period'),
                    time: record.get('time'),
                    x: record.get('x'),
                    y: record.get('y')
                });

                player.get('shots').add(shot);
            }
        });

        return roster;
    },

    buildRosterShootingData:function(roster) {
        var result = Ext.create('Ext.data.JsonStore', {
                fields: [
                    {name: 'name', type:'string'},
                    {name: 'points', type:'int'},
                    {name: 'totalShots', type:'int'},
                    {name: 'madeShots', type:'int'},
                    {name: 'missedShots', type:'int'}
                ],
                sorters: [{
                    property: 'points',
                    direction: 'DESC' // or 'ASC'
                }]
            });

        roster.each(function(player) {
            var shots = player.get('shots'),
                points = 0,
                totalShots = 0,
                made = 0,
                missed = 0;

            shots.each(function(shot) {
                points += shot.get('points');
                totalShots += 1;

                if(shot.get('points')) {
                    made += 1;
                }
                else {
                    missed += 1;
                }
            });

            result.add({
                name: player.get('name'),
                points: points,
                totalShots: totalShots,
                madeShots: made,
                missedShots: missed
            });
        });

        return result;
    },

    buildPlayerShootingData: function(roster, name) {
        var shots = roster.findRecord('name', name).get('shots'),
            result = Ext.create('Ext.data.JsonStore', {
                fields: [
                    {name: 'name', type:'string'},
                    {name: 'total', type:'int'}
                ],
                sorters: [{
                    property: 'total',
                    direction: 'DESC' // or 'ASC'
                }]
            }),
            threePoint = 0,
            drivingLayup= 0,
            fadeAwayJumper = 0,
            jump = 0,
            layup = 0,
            pullupJump = 0,
            stepBackJump = 0;

        shots.each(function(shot) {
            switch(shot.get('type')) {
                case this.THREE_POINT:
                    threePoint +=1;
                    break;
                case this.DRIVING_LAYUP:
                    drivingLayup +=1;
                    break;
                case this.FADE_AWAY_JUMPER:
                    fadeAwayJumper +=1;
                    break;
                case this.JUMP:
                    jump +=1;
                    break;
                case this.LAYUP:
                    layup +=1;
                    break;
                case this.PULLUP_JUMP:
                    pullupJump +=1;
                    break;
                case this.STEP_BACK_JUMP:
                    stepBackJump +=1;
                    break;
            }
        }, this);

        result.add({name: this.THREE_POINT, total: threePoint});
        result.add({name: this.DRIVING_LAYUP, total: drivingLayup});
        result.add({name: this.FADE_AWAY_JUMPER, total: fadeAwayJumper});
        result.add({name: this.JUMP, total: jump});
        result.add({name: this.LAYUP, total: layup});
        result.add({name: this.PULLUP_JUMP, total: pullupJump});
        result.add({name: this.STEP_BACK_JUMP, total: stepBackJump});

        result.filterBy(function(item) {
            return item.get('total') > 0;
        }, this);

        return result;
    },

    getRosterShotData:function(team) {
        var roster = this.buildRoster(team);
        return this.buildRosterShootingData(roster);
    },

    getPlayerShotData:function(team, name) {
        var roster = this.buildRoster(team);
        return this.buildPlayerShootingData(roster, name);
    }
});