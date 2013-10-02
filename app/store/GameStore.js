Ext.define("BasketballDashboard.store.GameStore", {
    extend: "Ext.data.Store",
    model: "BasketballDashboard.model.GameEventModel",

    storeId: 'gameStore',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        url : 'resources/data/20090318-MIABOS.json',
        reader: {
            type: 'json'
        }
    }
});