/* eslint-disable no-unused-vars */
import itemApi from '../../api/item'
import { db, auth, itemsCollection, consumersCollection } from '../../config/firebase'

// initial state
const state = {
  items: [],
  unsubItems: null
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

      snapshot.forEach(doc => { items.push({ id: doc.id, data: doc.data() }) })
      let consumerQuery = await consumersCollection.where('menu_id', '==', menuId).get()
      consumerQuery.forEach(doc => { consumers.push({consumerId: doc.id, data: doc.data()})})
      items.map(item => {
        let match = consumers.find(consumer => consumer.data.item_id === item.id)
        item.consumers = []
        item.amountInput = 0

        if (match) {
          item.consumers.push(match)
          item.amountInput = match.data.amount
        }
      })
      commit('setItems', items)
    }, (error) => {
      console.log(error)
    })
    commit('setUnsubItems', unsubItems)
  },
  unsubItemsListener ({ state }) {
    state.unsubItems()
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
    let user = auth.currentUser
    let itemId = data.itemId
    let itemIndex = data.itemIndex
    let amount = data.amount
    let menuId = data.menuId
    let userId = user.uid
    let type = data.type
    let currentItemConsumers = state.items[itemIndex].data.consumers
    let userDisplayName = user.displayName
    
    if (currentItemConsumers.length > 0) {
      // has consumer
      console.log('Item with consumers')
      try {
        await db.runTransaction(async tx => {
          let itemDoc = await tx.get(itemsCollection.doc(itemId))
          // find my user id in itemDocument
          if (itemDoc.data().consumers.find(element => element === userId)) {
            // Old consumer
            let querySnapshot = await consumersCollection
            .where('item_id', '==', itemId)
            .where('user_id', '==', userId)
            .get()
            let consumerDoc = null
            querySnapshot.forEach(doc => {
              console.log('doc', doc)
              consumerDoc = doc.ref
            })
            console.log('consumerdoc', consumerDoc)
            await tx.update(consumerDoc, {
              quantity: (type === 'add') ? amount + 1 : amount -1
            })
          } else {
            // New consumer
            // update item doc by inserting new consumer
            await tx.update(itemsCollection.doc(itemId), {
              consumers: db.firestore.FieldValue.arrayUnion(userId)
            })
            // add new item consumer
            await tx.set(consumersCollection.doc(), {
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
        // return error
      }
    } else {
      console.log('Item with no consumers')
      // Empty Consumer
      // add to item consumer
      let batch = db.batch()
      batch.update(itemsCollection.doc(itemId), {
        consumers: [userId]
      })
      // add new consumer
      batch.set(consumersCollection.doc(), {
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
  setUnsubItems (state, data) {
    state.unsubItems = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}