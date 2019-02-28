import Vue from 'vue'
import Router from 'vue-router'
import MenuList from './views/MenuList'
import MenuForm from './views/MenuForm'
import ItemList from './views/ItemList'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: '/item-list/:menuId?',
      name: 'item-list',
      component: ItemList,
      props: true
    }
  ]
})
