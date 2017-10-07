<template>
  <div id="clusterScatterPlot"></div>
</template>
<script>
import { data } from '../assets/global.js'

let d3 = require('d3')
// import d3 from 'd3'
export default {
  data() {
    return {
      // colors: ['#000000','#4C4C4C','#999999','#FFCC66','#800000','#804000','#808000','#408000' ,'#008000','#008040',
      //     '#008080','#004080','#000080','#400080','#800080','#800040','#FF0000','#FF66FF', '#FFFF00','#80FF00',
      //     '#00FF00','#00FF80','steelblue',/*#FF6666',*/'#BA5536','#0000FF','#8000FF','#FF00FF','#FF0080', /*'#66CCFF'*/'#FF6666','#336B87',
      //     '#FFFF66','#CCFF66','#66FF66','#66FFCC','#66FFFF','#00FFFF','#6666FF','#CC66FF', '#FF8000','#FF6FCF',
      //     '#F46142','#F4C542','#D4F442','#42F4AA','#42F4E8','#66A5AD','#CB42F4','#F442BC','#F44289','#F4425F'],
      //     
      colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
      defaultColor: 'black',
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

      var svg = d3.select("#clusterScatterPlot").append("svg")
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
        .attr("r", 2)
        .attr("cx", function(d) { return x(d['x']); })
        .attr("cy", function(d) { return y(d['y']); })
        .attr("fill", d => d['cluster'] === -1 ? vm.defaultColor : vm.colors[d['cluster']])
        .on('click', function(d, idx) {
          vm.$store.commit('SET_REVIEW_TYPE', { type: 'cluster' })
          vm.$store.commit('SET_SELECTED_REVIEW_ID', { id: idx })
        })

    },
    dataAdapter() {
      this.scatterPlotData = this.scatterPlotData.filter(function(d) {
        return d.length === 3
      });
      this.scatterPlotData.forEach(function(d) {
        d[0] = +d[0]
        d[1] = +d[1]
        d[2] = +d[2]
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
#clusterScatterPlot {
  flex: 1 1 auto
}

</style>
