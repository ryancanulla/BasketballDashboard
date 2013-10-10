Ext.define('BasketballDashboard.ui.roster.Roster', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.roster',
    requires: [],
    controller: "BasketballDashboard.ui.roster.RosterController",

    initComponent: function() {
        Ext.applyIf(this, {

            cls: 'rosterView',

            enableColumnHide:false,
            enableColumnMove:false,
            enableColumnResize:false,

            store: Ext.create('Ext.data.JsonStore', {
                fields: [
                    {name:'name', type: 'string'},
                    {name:'points', type: 'int'},
                    {name:'rebounds', type: 'int'},
                    {name:'assists', type: 'int'},
                    {name:'fouls', type: 'int'}
                ],
                data: []
            }),
            columns: [
                { text: 'PLAYER',  dataIndex: 'name', flex: 3, sortable: false },
                { text: 'PT',  dataIndex: 'points', flex: 1, sortable: false },
                { text: 'RB',  dataIndex: 'rebounds', flex: 1, sortable: false  },
                { text: 'AS',  dataIndex: 'assists', flex: 1, sortable: false  },
                { text: 'FL',  dataIndex: 'fouls', flex: 1, sortable: false }
            ]


        });
        return this.callParent(arguments);
    }
});