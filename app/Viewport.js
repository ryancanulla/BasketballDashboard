Ext.define("BasketballDashboard.Viewport", {
    extend: "Ext.container.Viewport",
    requires: [
        'BasketballDashboard.ui.filter.Filter',
        'BasketballDashboard.ui.score.Score'
    ],

    initComponent: function() {
        Ext.applyIf(this, {

            layout: 'fit',
            padding: 25,

            items: [
                {
                    xtype: 'panel',
                    title: 'app title',

                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    items: [
                        {
                            xtype: 'score'
                        },
                        {
                            xtype: 'filter'
                        }
                    ]
                }
            ]

        });
        return this.callParent(arguments);
    }
});