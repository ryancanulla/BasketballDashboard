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
//        var timeouts = {
//                home: {
//                    regular: 0,
//                    short: 0
//                },
//                away : {
//                    regular: 0,
//                    short: 0
//                }
//            };
//            period;

//        this.gameStore.each(function(record) {
//            period = record.get('period');
//
//            switch(period) {
//                case 1:
//                case 2:
//                    // is the first half
//                    break;
//                case 3:
//                case 4:
//                    // is the second half
//                    break;
//                case 5:
//                    // is overtime
//                    break;
//            }
//
//            if (record.get('etype') === 'timeout') {
//                // is the second half
//
//                // is overtime
//
//                if (record.get('team') === 'BOS') {
//                }
//                else {
//                }
//
//            }
//        }, this);

//        return timeouts;
    },

    _calculateFirstHalfTimeouts: function() {

    },

    _calculateSecondHalfTimeouts: function() {

    },

    _calculateOvertimeTimeouts: function() {

    }

//    _handleTimeouts: function(record, team) {
//        var period = record.get('period');
//
//        if(record.get('type') === 'regular') {
//            team.regular -= 1;
//        }
//        else {
//            team.short -= 1;
//        }
//    }
});
