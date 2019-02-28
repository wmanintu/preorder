import Vue from 'vue'
import Router from 'vue-router'
import MenuList from './views/MenuList'
import MenuForm from './views/MenuForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu-list',
      component: MenuList
    },
    {
      path: '/menu-form',
      name: 'menu-form',
      component: MenuForm
    }
  ]
})
