<template>
  <div>
    <el-button type="primary" @click.prevent="handleSignInFacebook" :loading="userLoading">
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
  async created () {
    try {
      let result = await firebase.auth().getRedirectResult()
      let user = firebase.auth().currentUser
      if (result.credential && user) {
        this.$router.push({ name: 'menu-list' })
      }
    } catch (error) {
      this.$message.error(error.message)
    }
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
