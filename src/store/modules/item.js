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
  async fetchItems ({ commit }, menuId) {
    try {
      let querySnapshot = await itemApi.getItems(menuId)
      if (querySnapshot.empty) {
        commit('setItems', [])
      } else {
        let items = []
        querySnapshot.forEach(doc => {
          items.push({
            id: doc.id,
            data: doc.data()
          })
        })
        commit('setItems', items)
      }
    } catch (error) {
      commit('setItems', [])
    }
  },
  setItemsListener ({ commit }, menuId) {
    db.collection('items').where('menu_id', '==', menuId).onSnapshot(snapshot => {
      snapshot.docChanges().forEach((change) => {
        let data = {id: change.doc.id, data: change.doc.data()}
        switch (change.type) {
          case 'added':
            commit('addedItem', data)
            break
          case 'modified':
            console.log("Modified: ", change.doc.data())
            commit('modifiedItem', data)
            break
          case 'removed':
            console.log("Removed: ", change.doc.data())
            commit('removedItem', data)
            break
        }
      })
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