(function() {
    var $graph = $(".graph-container");
    $(window).load(() => {
        drawGraph();
        window.onresize = drawGraph;
        function drawGraph () {
            var margin = { top: 0, right: 0, bottom: 0, left: 0};
            var width = $graph.width();
            var height = $graph.height();

            $("#graph").empty();
            var svg = d3.select("#graph")
                .append("svg")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", `0 0 ${width} ${height}`)
                .attr("class", "svg-content-responsive");

            var x = d3.scale.linear()
                .range([0, width]);
            var y = d3.scale.linear()
                .range([height, 0]);
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks("5");
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(10);
            var line = d3.svg.line()
                .interpolate("basis")
                .x(d => {return x(d.dist)})
                .y(d => {return y(d.elev)});
            var area = d3.svg.area()
                .interpolate("basis")
                .x(d => {return x(d.dist)})
                .y0(height)
                .y1(d => {return y(d.elev)});
            d3.json("./public/sample.json", (error, data) => {
                var g = svg.append("g");
                x.domain(d3.extent(data, d => { return d.dist}));
                y.domain([0, d3.max(data, d => { return d.elev})]);
                var dataNest = d3.nest()
                    .key(d => {return d.route;})
                    .entries(data);
                for (var d of dataNest) {
                    g.append("path")
                        .attr("class", "area")
                        .attr("d", area(d.values))
                        .attr("fill", $color[d.key])
                        .attr("id", d.key)
                        .on("mouseover", $graphMouseOver)
                        .on("mouseout", $graphMouseOut);
                    //g.append("path")
                    //    .attr("class", "line")
                    //    .attr("d", line(obj))
                    //    .attr("stroke", $color[key];

                }
                //g.append("g")
                //    .attr("class", "y axis")
                //    .attr("transform", `translate(${width-30}, 0`)
                //    .call(yAxis);
                //g.append("g")
                //    .attr("class", "x axis")
                //    .attr("transform", `translate(0,${height - 30})`)
                //    .call(xAxis);
            function mapMouseOver() {
                var s = `#${this.id}`;
                $(this).css("opacity", "1");
                $(s).css("opacity", "1");
                $(`.legend-item${s}`).css("opacity", "1");

            }
            function mapMouseOut() {
                var s = `#${this.id}`;
                $(this).css("opacity", ".5");
                $(s).css("opacity", ".5");
                $(`.legend-item${s}`).css("opacity", ".5");

            }
            });
        }
    });
})(window);
