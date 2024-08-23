// APIよりデータをjson形式で取得する
async function callApi() {
    // リソースを取得
    const host = "cti-12880310"
    const api_key = "0MakB4JS.oxUR39iNSCdlZG8qtnDn6NlmkmBQ55lA"
    const headers = {
        headers: {
            'x-api-key': api_key
        }
    }

    try {
        const response = await fetch(`http://${host}/api/kpi/20240823`, headers);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error: ', error);
    }
}

let data = callApi();
console.log(data);


// グループリスト (ここでは1グループにつき1列)
var allGroup = ["direct_handling_rate", "cumulative_callback_rate_under_20_min", "cumulative_callback_rate_under_40_min"];

// データを再フォーマットする: {x, y} タプルの配列が必要
let dataReady = allGroup.map(function(grpName) { 
    return {
        name: grpName,
        values: data.map(function(d) {
            return {time: d.created_at, value: +d[grpName]};
        })
    };
});


// グラフの寸法と余白を設定する
let margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// svgオブジェクトをページの本文に追加する
let svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// カラー スケール: 各グループに1色
var myColor = d3.scaleOrdinal()
.domain(allGroup)
.range(d3.schemeSet2);

// X 軸のスケール: 0～24
var x = d3.scaleLinear()
.domain([0, 24])
.range([0, width]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x).tickFormat(function(d) {
  // 時間形式のラベルを表示
  var hours = Math.floor(d);
  var minutes = Math.round((d - hours) * 60);
  return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
}))
.selectAll("text")
.style("fill", "white");

// Y 軸のスケール
var y = d3.scaleLinear()
.domain([0, 100])
.range([height, 0]);
svg.append("g")
.call(d3.axisLeft(y))
.selectAll("text")
.style("fill", "white");

// 線を追加
var line = d3.line()
.x(function(d) { return x(+d.time); })
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

// 点を追加
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
  .attr("cx", function(d) { return x(d.time); })
  .attr("cy", function(d) { return y(d.value); })
  .attr("r", 2)
  .attr("stroke", "white");

// 各線の終端にラベルを追加
svg
.selectAll("myLabels")
.data(dataReady)
.enter()
.append('g')
.append("text")
  .attr("class", function(d){ return d.name; })
  .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
  .attr("transform", function(d) { return "translate(" + x(d.value.time) + "," + y(d.value.value) + ")"; })
  .attr("x", 12)
  .text(function(d) { return d.name; })
  .style("fill", function(d){ return myColor(d.name); })
  .style("font-size", 15);

// 凡例を追加（インタラクティブ）
svg
.selectAll("myLegend")
.data(dataReady)
.enter()
.append('g')
.append("text")
  .attr('x', function(d,i){ return 30 + i*60; })
  .attr('y', 30)
  .text(function(d) { return d.name; })
  .style("fill", function(d){ return myColor(d.name); })
  .style("font-size", 15)
.on("click", function(d){
  // 要素が現在表示されているか？
  var currentOpacity = d3.selectAll("." + d.name).style("opacity");
  // 不透明度を変更: 0から1へ、または1から0へ
  d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0 : 1);
});