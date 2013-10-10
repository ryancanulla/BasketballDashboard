Ext.define( "BasketballDashboard.ui.time.Time", {
    extend: "Ext.container.Container",
    alias: 'widget.time',

    requires: [],

    controller: "BasketballDashboard.ui.time.TimeController",

    initComponent: function() {
        Ext.applyIf(this, {

            cls: 'timeView',

            layout: {
                type:'vbox',
                align:'center',
                pack: 'center'
            },

            items: [
                {
                    xtype: 'label',
                    itemId: 'timeLabel',
                    cls: 'timeLabel',
                    padding: 10,
                    margin: 10
                },
                {
                    xtype: 'label',
                    itemId: 'quarterLabel',
                    cls: 'quarterLabel'
                },
                {
                    xtype: 'label',
                    itemId: 'foulLabel',
                    cls: 'foulLabel'
                },
                {
                    xtype: 'label',
                    itemId: 'timeoutLabel',
                    cls: 'timeoutLabel'
                }
            ]

        });
        return this.callParent(arguments);
    }
});