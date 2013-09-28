Ext.define("BasketballDashboard.Viewport", {
    extend: "Ext.container.Viewport",
    requires: [],

    initComponent: function() {
        Ext.applyIf(this, {

            html:'some html'

        });
        return this.callParent(arguments);
    }
});