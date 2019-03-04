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
  },
  getItemAmount (state) {
    let itemAmount = state.items.map(item => {
      let total = item.consumers.reduce((total, currentValue) => {
        return total + currentValue.amount
      }, 0)
      let consumers = item.consumers.map(consumer => consumer.user_display_name)
      return { total: total, consumers: consumers, name: item.item_name}
    })
    return itemAmount
  }
}

const findMatchingItemId = (doc, items) => {
  let matchIndex = items.findIndex(item => item.id === doc.item_id)
  return matchIndex
}

// actions
const actions = {
  setItemsListener ({ commit }, menuId) {
    let unsubItems = itemsCollection.where('menu_id', '==', menuId)
    .orderBy('item_name', 'asc').onSnapshot(async snapshot => {
      let items = []

      snapshot.forEach(doc => {
        let item = Object.assign({id: doc.id}, doc.data())
        items.push(item)
      })
      let unsubConsumers = await consumersCollection
      .where('menu_id', '==', menuId).onSnapshot(async consumerQuery => {
        let consumers = []
        consumerQuery.forEach(doc => {
          let consumer = Object.assign({ consumerId: doc.id }, doc.data())
          consumers.push(consumer)
        })
        items.map(item => {
          let matches = consumers.filter(consumer => consumer.item_id === item.id)
          item.consumers = []
          if (matches.length > 0) {
            item.consumers = matches
          }
          if (!item.amount) {
            item.amount = 0
          }
        })
        consumerQuery.docChanges().forEach(async (change) => {
          if (change.type === 'added') {
            if (change.doc.data().user_id === auth.currentUser.uid) {
              let matchIndex = findMatchingItemId(change.doc.data(), items)
              items[matchIndex].amount = change.doc.data().amount
            }
          }
          if (change.type === 'modified') {
            let matchIndex = findMatchingItemId(change.doc.data(), items)
            items[matchIndex].amount = change.doc.data().amount
           
            if (change.doc.data().amount === 0) {
              try {
                await db.collection('consumers').doc(change.doc.id).delete()
                console.log('Document successfully deleted!')
                let matchIndex = items.findIndex(item => item.id === change.doc.data().item_id)
                let consumerIndex = items[matchIndex].consumers.findIndex(consumer => consumer.user_id === change.doc.data().user_id)
                if (consumerIndex >= 0) {
                  items[matchIndex].consumers.splice(consumerIndex, 1)
                }
              } catch (error) {
                console.error('Error removing document: ', error)
              }
            }
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
  unsubConsumersListener ({ state }) {
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