/* eslint-disable no-unused-vars */
import consumersApi from '../../api/consumer'
import { db, consumersCollection, itemsCollection } from '../../config/firebase'

// initial state
const state = {
  consumers: [],
  unsubConsumersListener: null,
  unsubConsumersItemListener: null
}

// getters
const getters = {
  getConsumers (state) {
    return state.consumers
  }
}

// actions
const actions = {
  async createConsumer ({ commit }, payload) {
    try {
      let docRef = await consumersApi.addConsumer(payload)
      return docRef
    } catch (error) {
      return error
    }
  },
  async getConsumers ({ commit }, menuId) {
    let unsubConsumersListener = consumersCollection.where('menu_id', '==', menuId)
      .onSnapshot(async snapshot => {
        let consumers = []
        snapshot.forEach(doc => {
          if (consumers.length > 0) {
            let matchIndex = consumers.findIndex(consumer => consumer.user_id === doc.data().user_id)
            if (matchIndex >= 0) {
              consumers[matchIndex].item_id_list.push({ item_id: doc.data().item_id, amount: doc.data().amount })
            } else {
              let consumer = doc.data()
              consumer.item_id_list = [{ item_id: doc.data().item_id, amount: doc.data().amount }]
              consumers.push(consumer)
            }
          } else {
            let consumer = doc.data()
            consumer.item_id_list = [{ item_id: doc.data().item_id, amount: doc.data().amount }]
            consumers.push(consumer)
          }
        })
        let unsubConsumersItemListener = itemsCollection.where('menu_id', '==', menuId)
          .onSnapshot(async itemSnapshot => {
            let items = []
            itemSnapshot.forEach(doc => {
              items.push(Object.assign({ item_id: doc.id }, doc.data()))
            })
            consumers.map(consumer => {
              consumer.item_id_list.map(cItem => {
                cItem.item_name = ''
                let match = items.find(item => item.item_id === cItem.item_id)
                if (match) {
                  cItem.item_name = match.item_name
                }
                return cItem
              })
              return consumer
            })
            commit('setConsumers', consumers)
          })
        commit('setUnsubConsumersItemListener', unsubConsumersItemListener)
      })
    commit('setUnsubConsumersListener', unsubConsumersListener)
  },
  unsubConsumersListener ({ state }) {
    state.unsubConsumersListener()
  },
  unsubConsumersItemListener ({ state }) {
    state.unsubConsumersItemListener()
  },
  async updateConsumer ({ commit }, payload) {
    // Create a reference to the SF doc.
    let docRef = consumersCollection.doc(payload.consumerId)
    return db.runTransaction((transaction) => {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(docRef).then((doc) => {
        if (!doc.exists) { throw new Error('Document does not exist!') }
        let newConsumer = null
        switch (payload.type) {
          case 'add':
            newConsumer = doc.data().amount + 1
            break
          case 'minus':
            newConsumer = doc.data().amount - 1
            break
        }
        transaction.update(docRef, { amount: newConsumer })
        console.log('consume amount:', newConsumer)
      })
    }).then(() => {
      console.log('updateConsumer successfully committed!')
    }).catch((error) => {
      console.error('Transaction failed: ', error)
    })
  }
}

// mutations
const mutations = {
  setConsumers (state, consumers) {
    state.consumers = consumers
  },
  setUnsubConsumersListener (state, data) {
    state.unsubConsumersListener = data
  },
  setUnsubConsumersItemListener (state, data) {
    state.unsubConsumersItemListener = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
