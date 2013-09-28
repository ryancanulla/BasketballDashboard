/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

// Configure Loader paths
Ext.Loader.setConfig({
    enabled: true,
    paths: {
//        "DeftQuickStart": "app",
//        "Ext": "/../../../sencha/ext-4.2.1.883/src"
    }
});

Ext.syncRequire(["Ext.Component", "Ext.ComponentManager", "Ext.ComponentQuery"]);

Ext.syncRequire(["BasketballDashboard.Application"]);
Ext.create("BasketballDashboard.Application");