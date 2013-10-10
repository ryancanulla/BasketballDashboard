Ext.define("BasketballDashboard.ui.time.TimeController", {
    extend: "Deft.mvc.ViewController",

    requires: ['BasketballDashboard.ui.time.TimeService'],
    inject:['timeService', 'gameStore'],

    observe: {
        gameStore: {
            datachanged: 'updateDisplay'
        }
    },

    control: {
        timeLabel: true,
        quarterLabel: true,
        foulLabel: true,
        timeoutLabel: true
    },

    init: function() {
        this.callParent(arguments);
    },

    updateDisplay:function() {
        var fouls, timeouts;

        this.getTimeLabel().setText(this.timeService.getTimeRemaining());
        this.getQuarterLabel().setText(this.timeService.getCurrentQuarter());

        fouls = this.timeService.getFouls();
        timeouts = this.timeService.getTimeouts();

        this.getFoulLabel().setText(fouls.home + ' TEAM FOULS ' + fouls.away);
        this.getTimeoutLabel().setText(timeouts.home.regular + '-' + timeouts.home.short + ' TIME OUTS ' + timeouts.away.regular + '-' + timeouts.away.short);
    }
});
