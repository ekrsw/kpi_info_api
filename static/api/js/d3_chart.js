async function callApi(date_str) {
  const host = "cti-12880310";
  const api_key = "0MakB4JS.oxUR39iNSCdlZG8qtnDn6NlmkmBQ55lA";
  const headers = {
      headers: {
          'x-api-key': api_key
      }
  };

  try {
      const response = await fetch(`http://${host}/api/kpi/${date_str}`, headers);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error: ', error);
  }
}

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

const date_str = `${year}${month}${day}`;

callApi(date_str).then(data => {
  var allGroup = [
    { name: "direct_handling_rate", label: "直受け率", threshold: 0.35 },
    { name: "cumulative_callback_rate_under_20_min", label: "20分内率", threshold: 0.8 },
    { name: "cumulative_callback_rate_under_40_min", label: "40分内率", threshold: 0.9 }
  ];

  let dataReady = allGroup.map(function(grp) { 
      return {
          name: grp.name,
          label: grp.label,
          threshold: grp.threshold,
          values: data.map(function(d) {
              return {time: new Date(d.created_at), value: +d[grp.name]};
          })
      };
  });

  let margin = {top: 10, right: 100, bottom: 30, left: 30},
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  let svg = d3.select("#my_dataviz")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var myColor = d3.scaleOrdinal()
  .domain(allGroup.map(grp => grp.name))
  .range(d3.schemeSet2);

  var x = d3.scaleTime()
  .domain([new Date(`${year}-${month}-${day}T00:00:00`), new Date(`${year}-${month}-${day}T23:59:59`)])
  .range([0, width]);
  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%H:%M")))
  .selectAll("text")
  .style("fill", "white");

  var y = d3.scaleLinear()
  .domain([0, 1])
  .range([height, 0]);
  svg.append("g")
  .call(d3.axisLeft(y))
  .selectAll("text")
  .style("fill", "white");

  var line = d3.line()
  .x(function(d) { return x(new Date(d.time)); })
  .y(function(d) { return y(+d.value); });
  svg.selectAll("myLines")
  .data(dataReady)
  .enter()
  .append("path")
    .attr("class", function(d){ return d.name; })
    .attr("d", function(d){ return line(d.values); })
    .attr("stroke", function(d){ return myColor(d.name); })
    .style("stroke-width", 1)
    .style("fill", "none");

  svg
  .selectAll("myDots")
  .data(dataReady)
  .enter()
  .append('g')
  .style("fill", function(d){ return myColor(d.name); })
  .attr("class", function(d){ return d.name; })
  .selectAll("myPoints")
  .data(function(d){ return d.values; })
  .enter()
  .append("circle")
    .attr("cx", function(d) { return x(new Date(d.time)); })
    .attr("cy", function(d) { return y(+d.value); })
    .attr("r", 2)
    .attr("stroke", "white");

  svg
  .selectAll("myLabels")
  .data(dataReady)
  .enter()
  .append('g')
  .append("text")
    .attr("class", function(d){ return d.name; })
    .datum(function(d) { return {name: d.name, label: d.label, value: d.values[d.values.length - 1]}; })
    .attr("transform", function(d) { return "translate(" + x(new Date(d.value.time)) + "," + y(+d.value.value) + ")"; })
    .attr("x", 12)
    .text(function(d) { return d.label; })
    .style("fill", function(d){ return myColor(d.name); })  // ラベルの色を線の色と一致させる
    .style("font-size", 15);

  // 水平線を追加
  svg.selectAll("myThresholdLines")
  .data(dataReady)
  .enter()
  .append("line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", function(d){ return y(d.threshold); })
    .attr("y2", function(d){ return y(d.threshold); })
    .attr("stroke", function(d){ return myColor(d.name); })
    .style("stroke-width", 1)
    .style("stroke-dasharray", ("3, 3"));
});
