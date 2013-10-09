Ext.define( "BasketballDashboard.ui.score.Score", {
    extend: "Ext.container.Container",
    alias: 'widget.score',

//    controller: "BasketballDashboard.ui.score.ScoreController",

    initComponent: function() {
        Ext.applyIf(this, {
            layout: {
                type: 'hbox',
                align: 'top'
            },

            items: [
                {
                    html: 'test'
                }
            ]

        });
        return this.callParent(arguments);
    }
});
