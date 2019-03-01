/* eslint-disable no-unused-vars */
import itemApi from '../../api/item'
import { db } from '../../firebase'

// initial state
const state = {
  items: [],
  consumers: []
}

// getters
const getters = {
  getItems (state) {
    return state.items
  },
  getConsumers (state) {
    return state.consumers
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
  setConsumersListener ({ commit }, menuId) {
    db.collection('consumers').where('menu_id', '==', menuId).onSnapshot(snapshot => {
      let consumers = []
      snapshot.forEach(doc => {
        consumers.push({ id: doc.id, data: doc.data() })
      })
      commit('setConsumers', consumers)
    }, (error) => {
      console.log(error)
    })
  },
  removeItemsListener () {
    var unsubscribe = db.collection('items').onSnapshot(function () {})
    unsubscribe()
  },
  removeConsumersListener () {
    var unsubscribe = db.collection('consumers').onSnapshot(function () {})
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
  // Item amount update
  async updateItemQuantity ({ state }, data) {
    // (itemId, itemIndex)
    console.log('call updateItemQuantity', data)
    console.log(db)
    let user = db.auth().currentUser
    console.log('user', user)
    let itemDocRef = db.collection('items').doc(itemId)
    let consumersColRef = db.collection('items')
    let itemId = data.itemId
    let itemIndex = data.itemIndex
    let userId = user.uid
    let userDisplayName = user.displayName
    let amount = data.amount
    let menuId = data.menuId
    let currentItemConsumers = state.items[itemIndex].data.consumer
    if (currentItemConsumers > 0) {
      // has consumer
      try {
        db.runTranscation(async (tx) => {
          let itemDoc = await tx.get(itemDocRef)
          // find my user id in itemDocument
          if (itemDoc.data().consumers.find(element => element === userId)) {
            // Old consumer
            let consumersDoc = await tx.get(consumersColRef)
            let consumerDoc = await consumersDoc.where('item_id', '==', itemId).where('user_id', '==', userId)
            await tx.update(consumerDoc, {
              quantity: amount
            })
          } else {
            // New consumer
            // update item doc by inserting new consumer
            await tx.update(itemDocRef, {
              consumers: db.firestore.FieldValue.arrayUnion(userId)
            })
            // add new item consumer
            await tx.set(consumersColRef, {
              item_id: itemId,
              amount: 1,
              user_id: userId,
              user_display_name: userDisplayName,
              menu_id: menuId
            })
          }
        })
      } catch (error) {
        console.log('transaction failed', error)
      }
    } else {
      // Empty Consumer
      // add to item's consumer
      let batch = db.batch()
      // let itemDocRef = db.collection('items').doc(itemIndex)
      batch.update(itemDocRef, {
        consumers: db.firestore.FieldValue.arrayUnion(userId)
      })
      // add new consumer of an item
      let consumersDocRef = db.collection('consumers')
      batch.set(consumersDocRef, {
        item_id: itemId,
        amount: 1,
        user_id: userId,
        user_display_name: userDisplayName,
        menu_id: menuId
      })
      try {
        await batch.commit()
      } catch (error) {
        console.log('batch failed')
      }
    }
  }
}

// mutations
const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setConsumers (state, consumers) {
    state.consumers = consumers
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}