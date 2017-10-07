<template>
  <div class="reviewWrapper">
    <button @click='putHash'>click</button>
    <div class="title">{{selectedCluster}}</div>
    <div class="content">
      <ul>
        <!-- <li v-for="(review,index) in filteredReviews" :class="{activeReview:selectedReviewId===review.index}">{{review.content}}</li> -->
        <sentence v-for='(review,index) in filteredReviews' :review='review' :class="{activeReview:selectedReviewId===review.index}"></sentence>
      </ul>
    </div>
  </div>
</template>
<script type="text/javascript">
let d3 = require('d3')
import { data } from '../../assets/global.js'
import sentence from '../sentence.vue'
let obj = { name: 'yunyou' }
let i = 0
export default {
  data() {
    return {
    }
  },
  methods: {
    putHash() {
      window.history.pushState(null, null, 'http://localhost:8081/static/test.html')
      // switch (i) {
      //  case 0:
      //    window.location.hash='/hi'
      //    break;
      //            case 1:
      //    window.location.hash='/hello'
      //    break;
      //  default:
      //    // statements_def
      //    break;
      // }
      // i++

    }
  },
  mounted() {
    this.reviews = data
    // console.log(window.location.hash)
  },
  computed: {
    type() {
      return this.$store.state.type
    },
    selectedReviewId() {
      // console.log(this.$store.state.selectedReviewId)
      return this.$store.state.selectedReviewId
    },
    selectedCluster() {
      if (this.selectedReviewId == undefined)
        return undefined
      let selectedReview = this.reviews.find((d, i) => d.index === this.selectedReviewId)
      return this.type === 'cluster' ? selectedReview['cluster'] : selectedReview['tag']
    },
    filteredReviews() {
      if (this.type === 'cluster')
        return this.selectedCluster != undefined ? this.reviews.filter(d => d.cluster === this.selectedCluster) : data
      else
        return this.selectedCluster != undefined ? this.reviews.filter(d => d.tag === this.selectedCluster) : data
    }
  },
  components: {
    sentence
  }
}

</script>
<style type="text/css">
.activeReview {
  /*background: rgba(7, 17, 27, 0.5);*/
  /*color: #fff;*/
  color:red;
  font-weight: bold;
}
</style>
