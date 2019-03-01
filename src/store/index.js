import Vue from 'vue'
import Vuex from 'vuex'
import MenuModule from './modules/menu'
import ItemModule from './modules/item'
import UserModule from './modules/user'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Menus: MenuModule,
    Items: ItemModule,
    Users: UserModule
  }
})