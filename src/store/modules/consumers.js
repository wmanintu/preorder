import { consumersCollection } from '../../config/firebase'

// initial state
const state = {
  consumers: [],
  unsubConsumers: null
}

// getters
const getters = {
  getConsumers (state) {
    return state.consumers
  }
}

// actions
const actions = {
  setConsumersListener ({ commit }, menuId) {
    let unsubConsumers = consumersCollection.where('menu_id', '==', menuId).onSnapshot(snapshot => {
      let consumers = []
      snapshot.forEach(doc => {
        consumers.push({ id: doc.id, data: doc.data() })
      })
      commit('setConsumers', consumers)
      commit('setUnsubConsumers', unsubConsumers)
    }, (error) => {
      console.log(error)
    })
  },
  unsubConsumersListener ({ state }) {
    state.unsubConsumers()
  }
}

// mutations
const mutations = {
  setConsumers (state, consumers) {
    state.consumers = consumers
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
