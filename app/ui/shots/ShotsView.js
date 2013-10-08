Ext.define( "BasketballDashboard.ui.shots.ShotsView", {
    extend: "Ext.container.Container",
    alias: 'widget.madeshots',

    requires: [
        'Ext.chart.Chart'
    ],

    controller: "BasketballDashboard.ui.shots.ShotsController",

    legendPosition:'left',
    border: false,

    initComponent: function() {
        Ext.applyIf(this, {

            layout: {
                type:'vbox',
                align:'stretch'
            },

            items: [
                {
                    xtype: 'toolbar',
                    flex:1,
                    layout: {
                        type:'hbox',
                        align:'middle'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId:'backButton',
                            text: 'Back',
                            hidden: true
                        },
                        {
                            xtype: 'button',
                            itemId:'pointsButton',
                            text: 'Points'
                        },
                        {
                            xtype: 'button',
                            itemId:'totalShotsButton',
                            text: 'Shot Attempts'
                        },
                        {
                            xtype: 'button',
                            itemId:'madeShotsButton',
                            text: 'Made Shots'
                        },
                        {
                            xtype: 'button',
                            itemId:'missedShotsButton',
                            text: 'Missed Shots'
                        }
                    ]
                },
                {
                    itemId:'topShootersChart',
                    xtype: 'chart',
                    flex:6,
                    store: Ext.create('Ext.data.JsonStore', {
                        fields: [
                            {name:'name', type: 'string'},
                            {name:'points', type: 'int'}
                        ],
                        data: [
                            {name: 'ryan', points: 22 },
                            {name: 'joel', points: 12 },
                            {name: 'chris', points: 2 },
                            {name: 'dan', points: 19 }
                        ]
                    }),
                    insetPadding: 25,
                    animate: true,
                    legend: {
                        boxStrokeWidth: 1,
                        boxStroke:'#ccc',
                        position: this.legendPosition,
                        boxFill:'#f7f7f7'
                    },
                    series: [{
                        type: 'pie',
                        angleField: 'points',
//                        colorSet: this.colorSet,
                        showInLegend: true,
                        listeners: {
                            itemclick: function (obj) {
                                this.chart.fireEvent('chartItemClick', obj);
                            }
                        },
                        tips: {
                            trackMouse: true,
                            width: 185,
                            height: 20,
                            renderer: function(storeItem, item) {}
                        },
                        highlight: {
                            segment: {
                                margin: 20
                            }
                        },
                        highlightDuration:150
                    }]

                }
            ]

        });
        return this.callParent(arguments);
    }
});