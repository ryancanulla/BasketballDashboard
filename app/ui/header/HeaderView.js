Ext.define("BasketballDashboard.ui.header.HeaderView", {
    extend: "Ext.container.Container",
    alias: 'widget.appHeader',
    requires: [],

    initComponent: function() {
        Ext.applyIf(this, {

            layout: {
                type:'hbox'
            },

            items: [
                {
                    xtype:'container',
                    html: 'Home Team',
                    flex: 1
                },
                {
                    xtype:'container',
                    html: 'Away Team',
                    flex: 1
                }
            ]


        });
        return this.callParent(arguments);
    }
});