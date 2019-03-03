import Vue from 'vue'
import Vuex from 'vuex'
import MenuModule from './modules/menu'
import ItemModule from './modules/item'
import ConsumerModule from './modules/consumers'
import UserModule from './modules/user'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Menus: MenuModule,
    Items: ItemModule,
    Consumers: ConsumerModule,
    Users: UserModule
  }
})