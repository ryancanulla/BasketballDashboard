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
                            xtype: 'container',
                            layout: { type: 'hbox', align: 'stretch' },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'score',
                                    homeTeam: true,
                                    flex:1
                                },
                                {
                                    xtype: 'score',
                                    homeTeam: false,
                                    flex:1
                                }
                            ]
                        },
                        {
                            xtype: 'filter',
                            flex: 3
                        }
                    ]
                }
            ]

        });
        return this.callParent(arguments);
    }
});