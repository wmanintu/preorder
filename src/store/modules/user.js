// import { db } from '../../firebase'
import firebase from 'firebase'

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
  signInFacebook () {
    let provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  },
  async signOut ({ commit }) {
    try {
      await firebase.auth().signOut()
      commit('setUser', null)
      return
    } catch (error) {
      return error
    }
  },
  onAuthStateChanged ({ commit }) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        commit('setUser', {
          id: user.uid,
          displayName: user.displayName,
          photoUrl: user.photoURL
        })
        return 'menu-list'
      } else {
        return 'login'
      }
    })
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