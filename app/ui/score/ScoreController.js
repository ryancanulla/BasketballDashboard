Ext.define("BasketballDashboard.ui.score.ScoreController", {
    extend: "Deft.mvc.ViewController",

    requires: ['BasketballDashboard.ui.score.ScoreService'],
    inject:['scoreService'],

    observe: {
        scoreService: {
            scoreboardChangedEvent: 'updateDisplay'
        }
    },

    control: {
        scoreLabel:true,
        teamLogo:true
    },

    init: function() {
        this.callParent(arguments);
        this.updateDisplay();
        this.updateLogo();
    },

    updateDisplay:function() {
        this.updateScore();
    },

    updateLogo:function() {
        var url;
        if(this.getView().homeTeam) {
            url = 'resources/images/teamLogos/Boston.jpg';
        }
        else {
            url = 'resources/images/teamLogos/Miami.jpg';
        }
        this.getTeamLogo().setSrc(url);
    },

    updateScore: function() {
        var score;
        if(this.getView().homeTeam) {
            score = this.scoreService.getCurrentScore().home;
        }
        else {
            score = this.scoreService.getCurrentScore().away;
        }
        this.getScoreLabel().setText(score);
    },

    updateCurrentLineups: function() {
        var currentLineup = this.scoreboardService.getCurrentLineup();

        this.getH1().getEl().dom.innerText = currentLineup.h1;
        this.getH2().getEl().dom.innerText = currentLineup.h2;
        this.getH3().getEl().dom.innerText = currentLineup.h3;
        this.getH4().getEl().dom.innerText = currentLineup.h4;
        this.getH5().getEl().dom.innerText = currentLineup.h5;

        this.getA1().getEl().dom.innerText = currentLineup.a1;
        this.getA2().getEl().dom.innerText = currentLineup.a2;
        this.getA3().getEl().dom.innerText = currentLineup.a3;
        this.getA4().getEl().dom.innerText = currentLineup.a4;
        this.getA5().getEl().dom.innerText = currentLineup.a5;
    }
});
