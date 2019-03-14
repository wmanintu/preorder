/* eslint-disable no-unused-vars */
import menuApi from '../../api/menu'
import { menusCollection } from '../../config/firebase'

// initial state
const state = {
  menus: [],
  menu: {
    id: '',
    data: {
      name: '',
      desc: ''
    }
  },
  unsubMenuOne: null,
  unsubMenuTwo: null
}

// getters
const getters = {
  getMenus (state) {
    return state.menus
  },
  getMenu (state) {
    return state.menu
  }
}

// actions
const actions = {
  async createMenu ({ commit }, data) {
    try {
      data.timestamp = new Date()
      let payload = {}
      payload = Object.assign(payload, data)
      let docRef = await menuApi.createMenu(payload)
      return docRef
    } catch (error) {
      return error
    }
  },
  setMenusListener ({ commit }) {
    let unsubMenuOne = menusCollection.orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      let menus = []
      snapshot.forEach(doc => {
        menus.push({ id: doc.id, data: doc.data() })
      })
      commit('setMenus', menus)
    }, (error) => {
      console.log(error)
    })
    commit('setUnsubMenuOne', unsubMenuOne)
  },
  unsubMenusListener ({ state }) {
    state.unsubMenuOne()
  },
  unsubMenuListener ({ state }) {
    state.unsubMenuTwo()
  },
  setMenuListener ({ commit }, menuId) {
    let unsubMenuTwo = menusCollection.doc(menuId).onSnapshot({
      includeMetadataChanges: true
    }, (doc) => {
      commit('setMenu', { id: doc.id, data: doc.data() })
    })
    commit('setUnsubMenuTwo', unsubMenuTwo)
  },
  removeMenuListener ({ commit }, menuId) {
    var unsubscribe = menusCollection.doc(menuId).onSnapshot(function () {})
    unsubscribe()
  }
}

// mutations
const mutations = {
  setMenus (state, menus) {
    state.menus = menus
  },
  addedMenu (state, newMenu) {
    state.menus.unshift(newMenu)
  },
  modifiedMenu (state, newMenu) {
    let index = state.menus.findIndex(element => element.id === newMenu.id)
    state.menus[index] = Object.assign(state.menus[index], newMenu)
  },
  removedMenu (state, menuId) {
    let index = state.menus.findIndex(element => element.id === menuId)
    state.menus.splice(index, 1)
  },
  setMenu (state, menu) {
    state.menu = menu
  },
  setUnsubMenuOne (state, data) {
    state.unsubMenuOne = data
  },
  setUnsubMenuTwo (state, data) {
    state.unsubMenuTwo = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
