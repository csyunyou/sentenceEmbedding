'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from './actions';
import mutations from './mutations.js';
Vue.use(Vuex);
const state = {
	selectedReviewId:undefined,
	type:undefined,
	selectedWord:undefined
};
export default new Vuex.Store({
  state,
  // actions,
  mutations
}); 