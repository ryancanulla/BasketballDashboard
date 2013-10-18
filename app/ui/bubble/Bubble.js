Ext.define( "BasketballDashboard.ui.bubble.Bubble", {
    extend: "BasketballDashboard.Visualization",
    alias: 'widget.bubble',

    requires: [
        'BasketballDashboard.Visualization',
        'BasketballDashboard.ui.bubble.BubbleController'
    ],

    controller: "BasketballDashboard.ui.bubble.BubbleController",

    initComponent: function() {
        Ext.applyIf(this, {
            cls:'bubbleView'
        });
        return this.callParent(arguments);
    },

    afterRender: function() {

        function BubbleChart(options) {
            var width = 720,
                height = 80,
                selection = options.selection,
                color = d3.scale.category20c(),
                svg,
                bubble;

            svg = d3.select('#' + selection).append("svg")
                .attr("class", "chart");

            function chart(data) {
                var node, group, circle;

                bubble = d3.layout.pack()
                    .sort(null)
                    .size([width, height])
                    .padding(1.5);

                data = bubble.nodes(data).filter(function(d) { return !d.children; });

                node = svg.selectAll(".node")
                    .data(data);

                node.enter().append("circle")
                    .attr("class", "node")
                    .style( 'opacity', 0 )
                    .style("fill", function(d) { return color(d.name); })
                .append("text")
                    .attr("dy", ".3em")
                    .style("text-anchor", "middle")
                    .text(function(d) { return d.name.substring(0, d.r / 3); });

                node.exit()
                    .transition()
                    .style( 'opacity', 0 )
                    .remove();

                node.transition()
                    .style('opacity', 1)
                    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
                    .attr("r", function(d) { return d.r; });

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

        this.visualization = BubbleChart( { selection: this.getId()} );

        return this.callParent(arguments);
    },

    refresh: function() {
        if(this.visualization && this.getData().length) {
            this.visualization(this.getData()[0]);
        }
    }
});