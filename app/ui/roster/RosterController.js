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
        var newStore = this.rosterService.getRosterData().homeTeam;
        this.getView().reconfigure(newStore);
    }
});
