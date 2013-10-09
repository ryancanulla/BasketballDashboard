Ext.define("BasketballDashboard.ui.score.ScoreController", {
    extend: "Deft.mvc.ViewController",

    inject:['scoreService'],

    observe: {
        scoreService: {
            scoreboardChangedEvent: 'updateDisplay'
        }
    },

    control: {
        homeTeamLogo: true,
        homeTeamScore: true,
        awayTeamLogo: true,
        awayTeamScore: true,
        timeRemainingDisplay:true,
        quarterDisplay:true,
        h1:true,
        h2:true,
        h3:true,
        h4:true,
        h5:true,
        a1:true,
        a2:true,
        a3:true,
        a4:true,
        a5:true
    },

    init: function() {
        this.callParent(arguments);
        this.updateDisplay();

        this.getHomeTeamLogo().getEl().dom.src = 'resources/images/teamLogos/Boston.jpg';
        this.getAwayTeamLogo().getEl().dom.src = 'resources/images/teamLogos/Miami.jpg';
    },

    updateDisplay:function() {
        this.updateScore();
        this.updateTime();
        this.updateQuarter();
        this.updateCurrentLineups();

        this.getView().doLayout();
    },

    updateScore: function() {
        var homeScore = this.scoreService.getCurrentScore().home,
            awayScore = this.scoreService.getCurrentScore().away;

        this.getHomeTeamScore().getEl().dom.innerText = homeScore;
        this.getAwayTeamScore().getEl().dom.innerText = awayScore;
    },

    updateTime:function() {
        var timeRemaining = this.scoreService.getTimeRemaining();

        this.getTimeRemainingDisplay().getEl().dom.innerText = timeRemaining;
    },

    updateQuarter:function() {
        this.getQuarterDisplay().getEl().dom.innerText = this.scoreService.getCurrentQuarter();
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
