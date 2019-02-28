/* eslint-disable no-unused-vars */
import itemApi from '../../api/item'
import { db } from '../../firebase'

// initial state
const state = {
  items: []
}

// getters
const getters = {
  getItems (state) {
    return state.items
  }
}

// actions
const actions = {
  setItemsListener ({ commit }, menuId) {
    db.collection('items').where('menu_id', '==', menuId).orderBy('item_name', 'asc').onSnapshot(snapshot => {
      let items = []
      snapshot.forEach(doc => {
        items.push({ id: doc.id, data: doc.data() })
      })
      commit('setItems', items)
    }, (error) => {
      console.log(error)
    })
  },
  removeItemsListener () {
    var unsubscribe = db.collection('items').onSnapshot(function () {})
    unsubscribe()
  },
  async createItem ({ commit }, data) {
    try {
      data.timestamp = Date.now()
      let payload = {}
      payload = Object.assign(payload, data)
      let docRef = await itemApi.createItem(payload)
      return docRef
    } catch (error) {
      return error
    }
  },
}

// mutations
const mutations = {
  setItems (state, items) {
    state.items = items
  },
  addedItem (state, newItem) {
    state.items.unshift(newItem)
  },
  modifiedItem (state, newItem) {
    let index = state.items.findIndex(element => element.id === newItem.id)
    state.menus[index] = Object.assign(state.menus[index], newItem)
  },
  removedItem (state, itemId) {
    let index = state.items.findIndex(element => element.id === itemId)
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