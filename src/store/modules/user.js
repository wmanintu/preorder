// import { db } from '../../firebase'

// initial state
const state = {
  displayName: '',
  id: '',
  photoUrl: ''
}

// getters
const getters = {
  getUser (state) {
    return {
      userDisplayName: state.displayName,
      userId: state.id,
      userPhotoUrl: state.photoUrl
    }
  }
}

// actions
const actions = {
  assignUser ({commit}, data) {
    commit('setUser', data)
  }
}

// mutations
const mutations = {
  setUser ({state}, data) {
    state.displayName = data.userDisplayName,
    state.id = data.userId,
    state.photoUrl = data.userPhotoUrl
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}