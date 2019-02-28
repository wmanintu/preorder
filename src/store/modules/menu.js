/* eslint-disable no-unused-vars */
import menuApi from '../../api/menu'
import { db } from '../../firebase'

// initial state
const state = {
  menus: [],
  menu: {
    id: '',
    data: {
      name: '',
      desc: ''
    }
  }
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
    db.collection('menus').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      let menus = []
      snapshot.forEach(doc => {
        menus.push({ id: doc.id, data: doc.data() })
      })
      commit('setMenus', menus)
    }, (error) => {
      console.log(error)
    })
  },
  removeMenusListener () {
    var unsubscribe = db.collection('menus').onSnapshot(function () {})
    unsubscribe()
  },
  setMenuListener ({ commit }, menuId) {
    db.collection('menus').doc(menuId).onSnapshot({
      includeMetadataChanges: true
    }, (doc) => {
      commit('setMenu', { id: doc.id, data: doc.data() })
    })
  },
  removeMenuListener ({ commit }, menuId) {
    var unsubscribe = db.collection('menus').doc(menuId).onSnapshot(function () {})
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}