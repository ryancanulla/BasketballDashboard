Ext.define('BasketballDashboard.ui.time.TimeService', {
    mixins: { observable: 'Ext.util.Observable' },

    inject:['gameStore'],

    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
    },

    getTimeRemaining:function() {
        var gameEvent = this.gameStore.last(),
            result = '15:00';

        if(gameEvent) {
            result = gameEvent.data.time;

            if(result.length < 5) {
                result = ' ' + result;
            }
        }

        return result;
    },

    getCurrentQuarter:function() {
        var gameEvent = this.gameStore.last(),
            quarter,
            result = 'QUARTER: ';

        if(gameEvent) {
            quarter = gameEvent.data.period;
            if(quarter === 5) {
                result = 'OVERTIME';
            }
            else {
                result += quarter;
            }
        }

        return result;
    },

    getFouls: function() {
        var fouls = { home: 0, away: 0},
            period = this.gameStore.last().get('period');

        this.gameStore.each(function(record) {

            if(record.get('period') === period) {
                if(record.get('etype') === 'foul') {

                    if(record.get('team') === 'BOS') {
                        fouls.home += 1;
                    }
                    else {
                        fouls.away += 1;
                    }
                }
            }
        }, this);

        return fouls;
    },

    getTimeouts: function() {
        var timeouts = {
            home: { regular:6, short:1 },
            away : { regular:6, short:1 }
        };

        this.gameStore.each(function(record) {
            if (record.get('etype') === 'timeout') {

                if (record.get('team') === 'BOS') {
                    this._handleTimeouts(record, timeouts.home);
                }
                else {
                    this._handleTimeouts(record, timeouts.away);
                }

            }
        }, this);

        return timeouts;
    },

    _handleTimeouts: function(record, team) {
        var period = record.get('period');

        if(record.get('type') === 'regular') {
            team.regular -= 1;
        }
        else {
            team.short -= 1;
        }
    }
});
