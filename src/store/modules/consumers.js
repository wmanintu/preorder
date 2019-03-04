/* eslint-disable no-unused-vars */
import consumersApi from '../../api/consumer'
import { db, consumersCollection } from '../../config/firebase'

// initial state
const state = {
}

// getters
const getters = {
}

// actions
const actions = {
  async createConsumer ({ commit }, payload) {
    try {
      console.log('createConsumer', payload)
      let docRef = await consumersApi.addConsumer(payload)
      return docRef
    } catch (error) {
      return error
    }
  },
  async updateConsumer ({ commit }, payload) {
    // Create a reference to the SF doc.
    console.log('call update consumer', payload.consumerId)
    var docRef = consumersCollection.doc(payload.consumerId)
    return db.runTransaction((transaction) => {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(docRef).then((doc) => {
        if (!doc.exists) { throw "Document does not exist!" }
        let newConsumer = null
        switch (payload.type) {
          case 'add':
            console.log('case add')
            newConsumer = doc.data().amount + 1
            break
          case 'minus':
            console.log('case minus')
            newConsumer = doc.data().amount - 1
            break
        }
        transaction.update(docRef, { amount: newConsumer })
      })
    }).then(() => {
        console.log('Transaction successfully committed!')
    }).catch((error) => {
        console.log('Transaction failed: ', error)
    });
  }
}

// mutations
const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
