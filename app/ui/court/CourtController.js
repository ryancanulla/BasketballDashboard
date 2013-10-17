Ext.define("BasketballDashboard.ui.court.CourtController", {
    extend: "Deft.mvc.ViewController",

    inject:['gameStore', 'courtService'],

    observe: {
        gameStore: {
            datachanged: 'updateDisplay'
        }
    },

    init: function() {
        this.callParent(arguments);
        this.updateDisplay();
    },

    updateDisplay:function() {
        var newStore;

        if(this.getView().homeTeam) {
            newStore= this.courtService.getAllShots().homeTeam;
        }
        else {
            newStore= this.courtService.getAllShots().awayTeam;
        }

        this.getView().bindStore(newStore);
    }
});
