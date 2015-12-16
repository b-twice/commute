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
                .ticks(5);
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("right")
                .ticks(10);
            var area = d3.svg.area()
                .interpolate("basis")
                .x(d => {return x(d.distance)})
                .y0(height)
                .y1(d => {return y(d.elevation)});
            d3.csv("./public/graph.csv", (error, data) => {
                data.forEach(d => {
                    d.distance = parseFloat(d.distance).toFixed(2);
                    d.elevation = +d.elevation;
                });
                var workCommute = data.filter(d => {return d.route == "work"})
                    .sort((a,b) => {return d3.descending(a.distance, b.distance)});
                var homeCommute = data.filter(d => {return d.route == "home"})
                    .sort((a,b) => {return d3.ascending(a.distance, b.distance)});
                data = homeCommute.concat(workCommute);
                var g = svg.append("g");
                x.domain(d3.extent(data, d => { return d.distance}));
                y.domain([0, d3.max(data, d => { return d.elevation})]);
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

                }
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", `translate(0,${height - 30})`)
                    .call(xAxis);

            });
        }
    });
})(window);
