import Vue from 'vue'
import Router from 'vue-router'
import PreorderList from '@/views/PreorderList.vue'
import CreatePreorder from '@/views/CreatePreorder.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'preorder-list',
      component: PreorderList
    },
    {
      path: '/create-preorder',
      name: 'create-preorder',
      component: CreatePreorder
    }
  ]
})
