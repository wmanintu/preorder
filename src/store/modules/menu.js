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
  async fetchMenus ({ commit }) {
    try {
      let querySnapshot = await menuApi.getMenus()
      if (querySnapshot.empty) {
        commit('setMenus', [])
      } else {
        let menus = querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
        commit('setMenus', menus)
      }
    } catch (error) {
      commit('setMenus', [])
    }
  },
  async createMenu ({ commit }, data) {
    try {
      data.timestamp = Date.now()
      let payload = {}
      payload = Object.assign(payload, data)
      let docRef = await menuApi.createMenu(payload)
      return docRef
    } catch (error) {
      return error
    }
  },
  setMenusListener ({ commit }) {
    db.collection('menus').onSnapshot(snapshot => {
      snapshot.docChanges().forEach((change) => {
        let data = {id: change.doc.id, data: change.doc.data()}
        switch (change.type) {
          case 'added':
            commit('addedMenu', data)
            break
          case 'modified':
            commit('modifiedMenu', data)
            break
          case 'removed':
            commit('removedMenu', data)
            break
        }
      })
    }, (error) => {
      return error
    })
  },
  removeMenusListener () {
    var unsubscribe = db.collection('menus').onSnapshot(function () {})
    unsubscribe()
  },
  async fetchMenu ({ commit }, menuId) {
    try {
      let querySnapshot = await menuApi.getMenu(menuId)
      if (querySnapshot.empty) {
        commit('setMenu', {})
      } else {
        let menu = { id: querySnapshot.id, data: querySnapshot.data() }
        commit('setMenu', menu)
      }
    } catch (error) {
      commit('setMenu', {})
    }
  },
  setMenuListener ({ commit }, menuId) {
    db.collection('menus').doc(menuId).onSnapshot({
      includeMetadataChanges: true
    }, (doc) => {
      // commit('setMenu', { id: doc.id, data: doc.data() })
    })
  },
  removeMenuListener ({ commit }, menuId) {
    var unsubscribe = db.collection('menus').doc(menuId).onSnapshot(function () {})
    unsubscribe()
  },
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