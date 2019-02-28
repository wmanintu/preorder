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
  setItemsListener () {
    db.collection('items').onSnapshot(snapshot => {
      snapshot.docChanges().forEach((change) => {
        switch (change.type) {
          case 'add':
            console.log("Add: ", change.doc.data())
            break
          case 'modified':
            console.log("Modified: ", change.doc.data())
            break
          case 'removed':
            console.log("Removed: ", change.doc.data())
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
  }
}

// mutations
const mutations = {
  setItems (state, items) {
    state.items = items
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}