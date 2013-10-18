Ext.define('BasketballDashboard.ui.bubble.BubbleModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'name', type: 'string'},
        {name:'value', type: 'int'},
        {name:'children', type: 'auto'}
    ]
});
