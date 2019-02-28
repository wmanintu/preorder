/* eslint-disable no-unused-vars */
import menuApi from '../../api/menu'
import { db } from '../../firebase'

// initial state
const state = {
  menus: []
}

// getters
const getters = {
  getMenus (state) {
    return state.menus
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
      let docRef = await menuApi.createOrder(data)
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}