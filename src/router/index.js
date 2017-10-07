import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import review from '@/components/review/review.vue'
import clusterInfo from '@/components/clusterInfo.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Hello',
    component: review
  }, {
    path: '/clusterInfo',
    component: clusterInfo
  }]
})
