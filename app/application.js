Ext.define('BasketballDashboard.Application', {

    extend: 'Deft.mvc.Application',
    requires: [
        'Deft.mixin.Controllable',
        'Deft.mixin.Injectable',
        'BasketballDashboard.Viewport'
    ],

    init: function() {

        Deft.Injector.configure({});

        Ext.tip.QuickTipManager.init();
        Ext.create('BasketballDashboard.Viewport');
    }

});
