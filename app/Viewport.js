Ext.define("BasketballDashboard.Viewport", {
    extend: "Ext.container.Viewport",
    requires: [
        'BasketballDashboard.ui.filter.Filter',
        'BasketballDashboard.ui.score.Score',
        'BasketballDashboard.ui.time.Time'
    ],

    homeColors: ['#008853',	'#e9d342',	'#aa4641',	'#dedede',	'#fab587'],
    awayColors: ['#98012e', '#faa11b', '#173849', '#d7d7d7', '#c90841'],

    initComponent: function() {
        Ext.applyIf(this, {

            layout: 'fit',
            padding: 25,

            items: [
                {
                    xtype: 'panel',
                    title: 'Game Recap',

                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    items: [
                        {
                            xtype: 'container',
                            layout: { type: 'hbox', align: 'stretch' },
                            flex: 2,
                            items: [
                                {
                                    xtype: 'container',
                                    html: 'homeTeam',
                                    flex:2
                                },
                                {
                                    xtype: 'score',
                                    homeTeam: true,
                                    flex:1
                                },
                                {
                                    xtype: 'time',
                                    flex: 2
                                },
                                {
                                    xtype: 'score',
                                    homeTeam: false,
                                    flex:1
                                },
                                {
                                    xtype: 'container',
                                    html: 'homeTeam',
                                    flex:2
                                }
                            ]
                        },
                        {
                            xtype: 'filter',
                            flex: 1
                        },
                        {
                            xtype: 'container',
                            layout: { type: 'hbox', align: 'stretch' },
                            flex: 4,
                            items: [
                                {
                                    xtype: 'shooting',
                                    team: 'BOS',
                                    legendPosition:'right',
                                    colorSet: this.homeColors,
                                    flex:1
                                },
                                {
                                    xtype: 'shooting',
                                    team: 'BOS',
                                    legendPosition:'right',
                                    colorSet: this.awayColors,
                                    flex:1
                                }
                            ]
                        }
                    ]
                }
            ]

        });
        return this.callParent(arguments);
    }
});