<template>
  <div id="app">
    <div class="row">
      <scatter-plot></scatter-plot>
      <cluster-scatter-plot></cluster-scatter-plot>
      <word-cloud></word-cloud>
    </div>
    <sankey></sankey>
    <!-- <router-view></router-view> -->
    <!-- <cluster-info></cluster-info> -->
  </div>
</template>
<script>
import scatterPlot from './components/scatterPlot.vue'
import review from './components/review/review.vue'
import clusterScatterPlot from './components/clusterScatterPlot.vue'
import wordCloud from './components/wordCloud.vue'
import clusterInfo from './components/clusterInfo.vue'
import sankey from './components/sankey.vue'
export default {
  name: 'app',
  components: {
    scatterPlot,
    review,
    clusterScatterPlot,
    wordCloud,
    clusterInfo,
    sankey
  }
}

</script>
<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
.row{
  display: flex;
}
</style>
