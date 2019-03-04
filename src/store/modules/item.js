/* eslint-disable no-unused-vars */
import itemApi from '../../api/item'
import { db, auth, itemsCollection, consumersCollection } from '../../config/firebase'

// initial state
const state = {
  items: [],
  unsubItems: null,
  unsubConsumers: null
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
    let unsubItems = itemsCollection.where('menu_id', '==', menuId)
    .orderBy('item_name', 'asc').onSnapshot(async snapshot => {
      let items = []
      let consumers = []

      snapshot.forEach(doc => {
        let item = Object.assign({id: doc.id}, doc.data())
        items.push(item)
      })
      let unsubConsumers = await consumersCollection
      .where('menu_id', '==', menuId).onSnapshot(async consumerQuery => {
        consumerQuery.forEach(doc => {
          let consumer = Object.assign({ consumerId: doc.id }, doc.data())
          consumers.push(consumer)
        })
        items.map(item => {
          let match = consumers.find(consumer => consumer.item_id === item.id)
          item.consumers = []
          if (match) {
            item.consumers.push(match)
          }
          if (!item.amount) {
            item.amount = 0
          }
        })
        consumerQuery.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            let matchIndex = items.findIndex(item => item.id === change.doc.data().item_id)
            items[matchIndex].amount = change.doc.data().amount
          }
          if (change.type === "modified") {
            let matchIndex = items.findIndex(item => item.id === change.doc.data().item_id)
            items[matchIndex].amount = change.doc.data().amount
           
            if (change.doc.data().amount === 0) {
               // delete document
              try {
                await db.collection('consumers').doc(change.doc.id).delete()
                console.log('Document successfully deleted!')
                let matchIndex = items.findIndex(item => item.id === change.doc.data().item_id)
                let consumerIndex = items[matchIndex].consumers.findIndex(consumer => consumer.user_id === change.doc.data().item_id)
                items[matchIndex].consumers.splice(consumerIndex, 1)
              } catch (error) {
                console.error('Error removing document: ', error)
              }
            }
          }
          if (change.type === "removed") {
            console.log("Removed: ", change.doc.data())
            // find item
            console.log(change.doc.data())
            // remove consumer
          }
        })
        commit('setItems', items)
      }, (error) => {
        console.log(error)
      })
      commit('setUnsubConsumers', unsubConsumers)
    }, (error) => {
      console.log(error)
    })
    commit('setUnsubItems', unsubItems)
  },
  unsubItemsListener ({ state }) {
    state.unsubItems()
  },
  unsubConsumers ({ state }) {
    state.unsubConsumers()
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
  }
}

// mutations
const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setUnsubItems (state, data) {
    state.unsubItems = data
  },
  setUnsubConsumers (state, data) {
    state.unsubConsumers = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}