Ext.define('BasketballDashboard.ui.shots.ShotsModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'player', type: 'string'},
        {name:'type', type: 'string'},
        {name:'points', type: 'int'},
        {name:'assist', type: 'string'},
        {name:'period', type: 'int'},
        {name:'time', type: 'string'},
        {name:'x', type: 'int'},
        {name:'y', type: 'int'}
    ]
});
