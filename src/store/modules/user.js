// initial state
const state = {
  user: null,
  loading: false
}

// getters
const getters = {
  getUser (state) {
    return state.user
  },
  getLoading (state) {
    return state.loading
  }
}

// actions
const actions = {
  setUser ({ commit }, user) {
    commit('setUser', user)
  },
  setLoading ({ commit }, flag) {
    commit('setLoading', flag)
  }
}

// mutations
const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setLoading (state, flag) {
    state.loading = flag
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}