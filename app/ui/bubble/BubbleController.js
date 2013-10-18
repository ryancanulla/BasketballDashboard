Ext.define("BasketballDashboard.ui.bubble.BubbleController", {
    extend: "Deft.mvc.ViewController",

    inject:['gameStore', 'bubbleService'],

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
            newStore= this.bubbleService.getPlayerData().homeTeam;
        }
        else {
            newStore= this.bubbleService.getPlayerData().awayTeam;
        }

        if(newStore) {
            this.getView().bindStore(newStore);
        }

    }
});
