<template>
  <div>
    <div v-if="displayName" style="text-align: right;">
      <User :displayName="displayName" :photoURL="photoURL"/>
      <el-button type="text" @click="signOut">Sign out</el-button>
    </div>
    <div v-else class="sign-in">
      <el-button type="primary" @click="signInWithRedirectFacebook">
        <i class="fab fa-facebook"></i> Sign in with Facebook
      </el-button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { getCookie, setCookie, deleteAllCookies } from '../util/cookies.js'
import User from './User'

export default {
  components: { User },
  created () {
    this.getFacebookRedirectResult()
    var user = firebase.auth().currentUser
  },
  data() {
    return {
      displayName: getCookie('displayName') || '',
      photoURL: getCookie('photoURL') || ''
    }
  },
  methods: {
    signInWithRedirectFacebook () {
      var provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    async getFacebookRedirectResult () {
      try {
        let result = await firebase.auth().getRedirectResult()
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken
          setCookie('token', token)
        }
        // The signed-in user info.
        if (result.user) {
          var user = result.user
          setCookie('displayName', user.displayName)
          setCookie('photoURL', user.photoURL)
          this.displayName = user.displayName
          this.photoURL = user.photoURL
        }
      } catch (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        // ...
      }
    },
    async signOut () {
      try {
        await firebase.auth().signOut()
        deleteAllCookies()
        window.location.reload()
      } catch (error) {}
    }
  }
}
</script>

<style scoped>
.sign-in {
  text-align: right;
}
</style>
