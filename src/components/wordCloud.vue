<template>
  <div id='wordCloud'></div>
</template>
<script type="text/javascript">
let d3 = require('d3')
import d3Cloud from 'd3-cloud'
import { data } from '../assets/global.js'
export default {
  data() {
    return {
      wordCloudData: [],
      // colors: ['#000000','#4C4C4C','#999999','#FFCC66','#800000','#804000','#808000','#408000' ,'#008000','#008040',
      //     '#008080','#004080','#000080','#400080','#800080','#800040','#FF0000','#FF66FF', '#FFFF00','#80FF00',
      //     '#00FF00','#00FF80','steelblue',/*#FF6666',*/'#BA5536','#0000FF','#8000FF','#FF00FF','#FF0080', /*'#66CCFF'*/'#FF6666','#336B87',
      //     '#FFFF66','#CCFF66','#66FF66','#66FFCC','#66FFFF','#00FFFF','#6666FF','#CC66FF', '#FF8000','#FF6FCF',
      //     '#F46142','#F4C542','#D4F442','#42F4AA','#42F4E8','#66A5AD','#CB42F4','#F442BC','#F44289','#F4425F'],
       colors:['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'],
      aspectsNum: 30
    }
  },
  methods: {
    draw() {
      let vm = this
      d3.select('#wordCloud>svg').remove()

      var margin = { top: 40, right: 30, bottom: 20, left: 40 },
        width = 470 - margin.left - margin.right,
        height = 394 - margin.top - margin.bottom;
      var data = this.wordCloudData.sort(({ count: a }, { count: b }) => b - a)
      // console.log(data)
      if (data.length > this.aspectsNum) data = data.slice(0, this.aspectsNum)
      var [minVal, maxVal] = d3.extent(data, d => d.count)
      // var fontSize = d3.scalePow().exponent(1).domain([minVal, maxVal]).range([10, 80]);
      var fontSize = d3.scaleLinear().domain([minVal, maxVal]).range([10, 80]);
      // 
      var wordcloud = d3.select('#wordCloud').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr('class', 'wordcloud')
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      var layout = d3Cloud()
        .timeInterval(10)
        .size([width, height])
        .words(data)
        .rotate(function(d) { return 0; })
        .font('monospace')
        .fontSize(function(d, i) { return fontSize(d.count); })
        .text(function(d) { return d.name; })
        .spiral("archimedean")
        .on("end", draw)
        .start();

      function draw(words) {
        wordcloud.selectAll("text")
          .data(words)
          .enter().append("text")
          .attr('class', 'word')
          .style("font-size", function(d) { return d.size + "px"; })
          .style("font-family", function(d) { return d.font; })
          .style("fill", function(d) {
            // var paringObject = data.filter(function(obj) { return obj.password === d.text });
            // return color(paringObject[0].category);
            return vm.colors[vm.selectedCluster]
          })
          .attr("text-anchor", "middle")
          .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
          .text(function(d) { return d.text; })
          .on('click',function(d){
          	vm.$store.commit('SET_SELECTED_WORD',{word:d.text})
          });
      };
    }
  },
  computed: {
    selectedCluster() {
      return this.$store.state.selectedReviewId && data.find(d => d.index === this.$store.state.selectedReviewId)['cluster']
    }
  },
  mounted() {
    this.draw()
  },
  watch: {
    selectedCluster(newVal) {
      console.log('selectedCluster:',newVal)
      let vm = this
      vm.wordCloudData = []
      data.filter(d => d.cluster === newVal).forEach(function({ content }) {
        content.trim().split(' ').forEach(function(word) {
          let target = vm.wordCloudData.find(d => d.name === word)
          if (target) target.count++
            else vm.wordCloudData.push({ name: word, count: 1 })
        })
      })
      this.draw()
    }
  }
}

</script>
<style>
#wordCloud {
  flex: 1 1 auto
}

</style>
