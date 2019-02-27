/* eslint-disable no-unused-vars */
import menuAPI from '../../api/menu'
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
      let querySnapshot = await menuAPI.getMenus()
      if (querySnapshot.empty) {
        commit('setMenus', [])
      } else {
        let menus = querySnapshot.docs.map(doc => ({id: doc.id, data: doc.data()}))
        commit('setMenus', menus)
      }
    } catch (error) {
      commit('setMenus', [])
    }
  },
  async createMenu ({ commit }, data) {
    try {
      let docRef = await menuAPI.createOrder(data)
      return docRef
    } catch (error) {
      return error
    }
  },
  async addItemQuantity (orderId) {
    let sfDocRef = db.collection('menus').doc(orderId)
    try {
      let result = db.runTransaction(async (transaction) => {
        let sfDoc = await transaction.get(sfDocRef)

        if (!sfDoc.exists) { throw "Document does not exist!" }

        let newPopulation = sfDoc.data().population + 1
        if (newPopulation <= 1000000) {
            transaction.update(sfDocRef, { population: newPopulation })
            return newPopulation
        } else {
            return Promise.reject("Sorry! Population is too big.")
        }
      })
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  },
  setMenusListener () {
    db.collection('menus').onSnapshot(snapshot => {
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
  removeMenusListener () {
    var unsubscribe = db.collection('menus').onSnapshot(function () {})
    unsubscribe()
  }
}

// mutations
const mutations = {
  setMenus (state, menus) {
    state.menus = menus
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}