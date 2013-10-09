Ext.define( "BasketballDashboard.ui.score.Score", {
    extend: "Ext.container.Container",
    alias: 'widget.score',

    controller: "BasketballDashboard.ui.score.ScoreController",

    initComponent: function() {
        Ext.applyIf(this, {
            cls: 'scoreView',

            layout: {
                type: 'hbox',
                align: 'middle',
                pack:'center'
            },

            items: [
                {
                    xtype: 'image',
                    itemId: 'teamLogo'
                },
                {
                    xtype: 'label',
                    itemId: 'scoreLabel',
                    cls:'scoreLabel'
                }
            ]

        });
        return this.callParent(arguments);
    }
});
