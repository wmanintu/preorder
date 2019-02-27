import Vue from 'vue'
import Router from 'vue-router'
import MenuList from '@/views/MenuList.vue'
import CreateMenu from '@/views/CreateMenu.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu-list',
      component: MenuList
    },
    {
      path: '/create-menu',
      name: 'create-menu',
      component: CreateMenu
    }
  ]
})
