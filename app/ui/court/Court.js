Ext.define( "BasketballDashboard.ui.court.Court", {
    extend: "BasketballDashboard.Visualization",
    alias: 'widget.court',

    requires: [
        'BasketballDashboard.Visualization',
        'BasketballDashboard.ui.court.CourtController'
    ],
    controller: "BasketballDashboard.ui.court.CourtController",

    initComponent: function() {
        Ext.applyIf(this, {
            cls:'courtView',
            margin: 10
        });
        return this.callParent(arguments);
    },

    afterRender: function() {

        function CourtChart(options) {
            var width = 720,
                height = 80,
                selection = options.selection,
                svg,
                background;

            svg = d3.select('#' + selection).append("svg")
                .attr("class", "chart");

            background = svg.append('image')
                .attr('class', 'court')
                .attr('xlink:href', 'resources/images/court.svg')
                .attr('preserveAspectRatio', 'none');

            function chart(data) {
                var shots, x, y;

                background.attr('width', width)
                    .attr('height', height);

                x = d3.scale.linear()
                    .domain([0, 50])
                    .range([0, width]);

                y = d3.scale.linear()
                    .domain([0, 40])
                    .range([0, height]);

                shots = svg.selectAll("image.shot")
                    .data(data);

                shots.enter()
                    .append("image")
                    .attr('class', 'shot')
                    .attr('width', 21)
                    .attr('height', 21)
                    .attr('xlink:href', function(d) {
                        return d.result === BasketballDashboard.Const.MADE ?
                            'resources/images/madeShot.svg' : 'resources/images/missedShot.svg'
                    })
                    .attr('preserveAspectRatio', 'none')
                    .style('opacity', 0)

                shots.attr("x", function (d) { return x(d.x); })
                    .attr("y", function (d) { return y(d.y); });

                shots.transition()
                    .style('opacity', 1);

                shots.exit()
                    .transition()
                    .style( 'opacity', 0 )
                    .remove();
            }

            chart.width = function(value) {
                if (!arguments.length) return width;
                width = value;
                return chart;
            };

            chart.height = function(value) {
                if (!arguments.length) return height;
                height = value;
                return chart;
            };

            return chart;
        }

        this.visualization = CourtChart( { selection: this.getId()} );

        return this.callParent(arguments);
    },

    refresh: function() {
        if(this.visualization) {
            this.visualization(this.getData());
        }
    }
});