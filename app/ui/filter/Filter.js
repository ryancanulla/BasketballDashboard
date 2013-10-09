Ext.define( "BasketballDashboard.ui.filter.Filter", {
    extend: "Ext.container.Container",
    alias: 'widget.filter',

    controller: "BasketballDashboard.ui.filter.FilterController",
    border: false,

    initComponent: function() {
        Ext.applyIf(this, {
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'center',
                defaultMargins: {top: 0, right: 20, bottom: 5, left: 20}
            },
            items: [
                {
                    itemId: 'timeScrubber',
                    xtype: 'slider',
                    flex:1,
                    value: 459,
                    minValue: 1,
                    maxValue: 459,
                    useTips:false,
                    maxHeight: 20,

                    style: {
                        backgroundImage: 'url(http://docs.sencha.com/extjs/4.2.1/extjs-build/examples/slider/images/ticks.gif)'
                    }
                }
            ]

        });
        return this.callParent(arguments);
    }
});
