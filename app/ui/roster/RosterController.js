Ext.define("BasketballDashboard.ui.roster.RosterController", {
    extend: "Deft.mvc.ViewController",

    requires: ['BasketballDashboard.ui.roster.RosterService'],
    inject:['rosterService', 'gameStore'],

    observe: {
        gameStore: {
            datachanged: 'updateDisplay'
        }
    },

    control: {
    },

    init: function() {
        this.callParent(arguments);
        this.updateDisplay();
    },

    updateDisplay:function() {
        var newStore;

        if(this.getView().homeTeam) {
            newStore= this.rosterService.getCurrentLineupSnapshot().homeTeam;
        }
        else {
            newStore= this.rosterService.getCurrentLineupSnapshot().awayTeam;
        }

        this.getView().reconfigure(newStore);
    }
});
