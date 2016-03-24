var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
var margin = {top:20,right:20,bottom:30,left:50};
var w = 650-margin.left-margin.right;
var h = 400-margin.top-margin.bottom;

var xScale = d3.scale.linear().range([0,w]);
var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
var xMap = function(d){ return xScale(d.Year);};
var xValue = function(d){return d.Year;};

var yScale = d3.scale.linear().range([h,0]);
var yAxis = d3.svg.axis().scale(yScale).orient("left");
var yMap = function(d){ return yScale(d.Seconds);};
var yValue = function(d){return d.Seconds;};

$(document).ready(function(){
  $.get(url, function(results){
    var data = JSON.parse(results);
    
    xScale.domain([d3.min(data,xValue)-1, d3.max(data,xValue)+1]);
    yScale.domain([d3.min(data,yValue)-1, d3.max(data,yValue)+1]);
    
    var svg = d3.select("body")
      .append("svg")
      .attr("width", w+margin.left+margin.right)
      .attr("height", h+margin.top+margin.bottom)
    .append("g")
      .attr("transform","translate("+margin.left+","+margin.top+")");
    
    svg.append("g")
      .attr("class", "axis")
      .attr("transform","translate(0,"+h+")")
      .call(xAxis)
     .append("text")
      .attr("class","label")
      .attr("x",w/2)
      .attr("y",-6)
      .style("text-anchor", "end")
      .text("Year");
    
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
     .append("text")
      .attr("class","label")
      .attr("x",-6)
      .attr("y",h/2)
      .style("text-anchor","end")
      .attr("transform","rotate(90)")
      .text("Seconds");
    
    var graph = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", "3px")
      .attr("cx", xMap)
      .attr("cy", yMap);
  });
});
