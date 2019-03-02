<template>
  <div>
    <el-button type="primary" @click="handleSignInFacebook" :loading="userLoading">
      <i class="fab fa-facebook"></i> Sign in with Facebook
    </el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
export default {
  computed: {
    ...mapGetters({
      userLoading: 'Users/getLoading'
    })
  },
  created () {
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        this.$router({ name: 'menu-list' })
      }
    }).catch(function(error) {
      this.$message.error(error.message)
    })
  },
  methods: {
    handleSignInFacebook () {
      let provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    }
  }
}
</script>

<style>

</style>
