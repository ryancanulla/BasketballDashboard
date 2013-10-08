Ext.define( "BasketballDashboard.ui.controls.ControlsView", {
    extend: "Ext.container.Container",
    alias: 'widget.userControls',

    controller: "BasketballDashboard.ui.controls.ControlsController",
    border: false,

    requires:['Ext.slider.Single'],

    layout: {
        type: 'vbox',
        align:'stretch',
        defaultMargins: {top: 20, right: 20, bottom: 20, left: 20}
    },

    initComponent: function() {
        Ext.applyIf(this, {

            items: [
                {
                    itemId: 'timeScrubber',
                    xtype: 'slider',
                    flex:1,
                    value: 200,
                    minValue: 1,
                    maxValue: 459,
                    useTips:false,
                    maxHeight: 20,
                    border:false,

                    style: {
                        backgroundImage: 'url(http://docs.sencha.com/extjs/4.2.1/extjs-build/examples/slider/images/ticks.gif)',
                        border:'solid 1px #999'
                    }
                }
            ]

        });
        return this.callParent(arguments);
    }
});