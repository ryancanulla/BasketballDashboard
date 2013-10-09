Ext.define('BasketballDashboard.ui.score.ScoreService', {
    mixins: { observable: 'Ext.util.Observable' },

    inject:['gameStore'],

    SCOREBOARD_CHANGED:'scoreboardChangedEvent',

    HOME_TEAM:'BOS',
    AWAY_TEAM: 'MIA',

    homeScore: null,
    awayScore: null,

    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
        this.gameStore.on('datachanged', this.onDataChanged, this);
        this.updateScore();
    },

    onDataChanged:function() {
        this.updateScore();
    },

    updateScore: function() {
        this.homeScore = 0;
        this.awayScore = 0;

        this.gameStore.each(function(record) {
            var data = record.data,
                team = data.team;

            if(data.points) {
                if(team === this.HOME_TEAM) {
                    this.homeScore += data.points;
                }
                else if (team === this.AWAY_TEAM) {
                    this.awayScore += data.points;
                }
            }

            // calculate free throws
            if(data.etype === 'free throw') {
                if(data.result === 'made') {
                    if(team === this.HOME_TEAM) {
                        this.homeScore += 1;
                    }
                    else if (team === this.AWAY_TEAM) {
                        this.awayScore += 1;
                    }
                }
            }

        }, this);
        this.fireEvent(this.SCOREBOARD_CHANGED);
    },

    getCurrentScore:function() {
        return {
            home: this.homeScore,
            away: this.awayScore
        }
    },

    getTimeRemaining:function() {
        var gameEvent = this.gameStore.last(),
            result = '15:00';

        if(gameEvent) {
            result = gameEvent.data.time;
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

    getCurrentLineup: function() {
        var gameEvent = this.gameStore.last(),
            currentLineup = {
                h1:'', h2:'', h3:'', h4:'', h5:'',
                a1:'', a2:'', a3:'', a4:'', a5:''
            };

        if(gameEvent) {
            currentLineup.h1 = gameEvent.data.h1;
            currentLineup.h2 = gameEvent.data.h2;
            currentLineup.h3 = gameEvent.data.h3;
            currentLineup.h4 = gameEvent.data.h4;
            currentLineup.h5 = gameEvent.data.h5;

            currentLineup.a1 = gameEvent.data.a1;
            currentLineup.a2 = gameEvent.data.a2;
            currentLineup.a3 = gameEvent.data.a3;
            currentLineup.a4 = gameEvent.data.a4;
            currentLineup.a5 = gameEvent.data.a5;
        }

        return currentLineup;
    }
});
