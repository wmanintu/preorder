import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import MenuList from '../views/MenuList'
import MenuForm from '../views/MenuForm'
import ItemList from '../views/ItemList'
import NotFound from '../views/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/menu-list',
      name: 'menu-list',
      component: MenuList
    },
    {
      path: '/item-list/:menuId?',
      name: 'item-list',
      component: ItemList,
      props: true
    },
    {
      path: '/menu-form',
      name: 'menu-form',
      component: MenuForm
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})
