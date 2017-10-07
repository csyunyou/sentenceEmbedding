<template>
  <div id='clusterInfo'></div>
</template>
<script type="text/javascript">
import { data } from '../assets/citymdW57DBSCANClusterInfo5_1.9_2.04.json'
let d3 = require('d3')
export default {
  data() {
    return {

    }
  },
  methods: {
    draw() {
      let vm = this
      d3.select('#clusterInfo>svg').remove()
      var margin = { top: 40, right: 30, bottom: 20, left: 40 },
        width = 470 - margin.left - margin.right,
        height = 390 - margin.top - margin.bottom;
      var g = d3.select("#clusterInfo").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      var x = d3.scaleLinear()
        .range([0, width]);
      var y = d3.scaleLinear()
        .range([height, 0]);
      var line = d3.line()
        .x(function(d) { return x(d.eps); })
        .y(function(d) { return y(d.clusterNum); });
      x.domain([0, d3.max(this.clusterInfoData, d => d.eps)])
      y.domain([0, d3.max(this.clusterInfoData, d => d.clusterNum)])
      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))


      g.append("g")
        .call(d3.axisLeft(y))


      g.append("path")
        .datum(this.clusterInfoData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);


    }
  },

  mounted() {
    this.clusterInfoData = data
    this.draw()
  }
}

</script>
