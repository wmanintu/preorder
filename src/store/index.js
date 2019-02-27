import Vue from 'vue'
import Vuex from 'vuex'
import MenuModule from './modules/menu'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Menus: MenuModule
  }
})