Ext.define('BasketballDashboard.ui.roster.RosterModel', {
    extend: 'Ext.data.Model',
    id:'name',
    fields: [
        {name: 'name', type:'string'},
        {name: 'points', type:'int'},
        {name: 'rebounds', type:'int'},
        {name: 'assists', type:'int'},
        {name: 'fouls', type:'int'}
    ]
});
