Ext.define("BasketballDashboard.Viewport", {
    extend: "Ext.container.Viewport",
    requires: [
        'BasketballDashboard.ui.header.HeaderView',
        'BasketballDashboard.ui.controls.ControlsView',
        'BasketballDashboard.ui.shots.ShotsView'
    ],

    homeColors: ['#008853',	'#e9d342',	'#aa4641',	'#dedede',	'#fab587'],
    awayColors: ['#98012e', '#faa11b', '#173849', '#d7d7d7', '#c90841'],

    initComponent: function() {
        Ext.applyIf(this, {

            layout: 'fit',

            items: [{
                xtype:'panel',
                flex:1,
                title: 'Basketball Dashboard',
                layout:{
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'appHeader',
                        flex:1
                    },
                    {
                        xtype: 'userControls',
                        flex:1
                    },
                    {
                        xtype: 'container',
                        flex:5,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype:'madeshots',
                                team: 'BOS',
                                legendPosition:'right',
                                colorSet: this.homeColors,
                                flex: 1
                            },
                            {
                                xtype:'madeshots',
                                team: 'MIA',
                                colorSet: this.awayColors,
                                flex: 1
                            }
                        ]
                    }
                ]

            }]

        });
        return this.callParent(arguments);
    }
});