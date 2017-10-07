<template>
  <li>
    <div v-for="item in review.content.trim().split(' ')" class='wordWrapper' :class='{activeWord:selectedWord===item}'>
      <span class='word'>{{item}}</span><span class='space'>&nbsp;</span>
    </div>
  </li>
</template>
<script type="text/javascript">
export default {
  data() {
    return {

    }
  },
  props: ['review'],
  computed: {
    selectedWord() {
      return this.$store.state.selectedWord
    },
    selectedReviewId() {
      return this.$store.state.selectedReviewId
    }
  },
  mounted() {
    // console.log(this.review)

  }
}

</script>
<style type="text/css">
.word {
  border-radius: 15%;
}

.wordWrapper {
  display: inline-block;
}

.wordWrapper:last-child>.space {
  display: none
}


.activeWord>.word {
  background: #feb24c;
}

</style>
