export default {
  SET_SELECTED_REVIEW_ID: function(state, { id }) {
    state.selectedReviewId = id
  },
  SET_REVIEW_TYPE: function(state, { type }) {
    state.type = type
  },
  SET_SELECTED_WORD: function(state, { word }) {
  	console.log(word)
    state.selectedWord = word
  }
}
