Ext.define("BasketballDashboard.Viewport", {
    extend: "Ext.container.Viewport",
    requires: [
        'BasketballDashboard.ui.header.HeaderView',
        'BasketballDashboard.ui.controls.ControlsView'
    ],

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
                    }
                ]
            }]

        });
        return this.callParent(arguments);
    }
});