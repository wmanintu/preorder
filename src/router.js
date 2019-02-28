import Vue from 'vue'
import Router from 'vue-router'
import MenuList from '@/views/MenuList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu-list',
      component: MenuList
    }
  ]
})
