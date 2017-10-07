<template>
  <div id="scatterPlot"></div>
</template>
<script>
import {data} from '../assets/citymdW57KMeans.json'

let d3 = require('d3')
// import d3 from 'd3'
export default {
  data() {
    return {
      colors: ['blue', 'red', 'yellow'],
      defaultColor:'black',
      scatterPlotData: []
    }
  },
  methods: {
    draw() {
      let vm = this
      var margin = { top: 40, right: 30, bottom: 20, left: 40 },
        width = 470 - margin.left - margin.right,
        height = 390 - margin.top - margin.bottom;

      var x = d3.scaleLinear()
        .range([0, width]);

      var y = d3.scaleLinear()
        .range([height, 0]);

      var svg = d3.select("#scatterPlot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain(d3.extent(this.scatterPlotData, function(d) { return d['x']; }));
      y.domain(d3.extent(this.scatterPlotData, function(d) { return d['y']; }));

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
      // .append("text")
      // .attr("class", "label")
      // .attr("x", width)
      // .attr("y", -6)
      // .style("text-anchor", "end")
      // .text("总流量")
      // .attr("fill", "#000")


      svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y))
      // .append("text")
      // .attr("class", "label")
      // .attr("transform", "rotate(-90)")
      // .attr("y", 6)
      // .attr("dy", ".71em")
      // .style("text-anchor", "end")
      // .text("自流量")
      // .attr("fill", "#000")
      // y.range([height,0])
      svg.selectAll(".dot")
        .data(this.scatterPlotData)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function(d) { return x(d['x']); })
        .attr("cy", function(d) { return y(d['y']); })
        .attr("fill", d => d[tag]===undefined?vm.defaultColor:vm.colors[d['tag']])
        .on('click',function(d,idx){
          console.log(idx)
          vm.$store.commit('SET_SELECTED_REVIEW_ID',{id:idx})
          vm.$store.commit('SET_REVIEW_TYPE',{type:'tag'})
        })

    },
    dataAdapter(){
      this.scatterPlotData=this.scatterPlotData.filter(function(d) {
        return d.length===3
      });
    	this.scatterPlotData.forEach(function(d){
    		d[0]=+d[0]
    		d[1]=+d[1]
    		d[2]=+d[2]
    	})
    }
  },
  mounted() {
    this.scatterPlotData = data
    // this.dataAdapter()
    this.draw()
  }
}

</script>
<style type="text/css">
#scatterPlot{
  flex: 1 1 auto;
}
</style>
