Ext.Loader.setConfig({
    enabled: true
});

Ext.syncRequire([
    "Ext.Component",
    "Ext.ComponentManager",
    "Ext.ComponentQuery",
    'BasketballDashboard.Application'
]);

Ext.onReady(function () {
    Ext.create("BasketballDashboard.Application");
});