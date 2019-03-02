<template>
  <div>
    <el-col class="card">
        <el-button type="primary" @click.prevent="handleSignInFacebook" :loading="userLoading">
          <i class="fab fa-facebook"></i> Sign in with Facebook
        </el-button>
    </el-col>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { auth } from '../config/firebase'
export default {
  computed: {
    ...mapGetters({
      userLoading: 'Users/getLoading'
    })
  },
  async created () {
    try {
      let result = await auth.getRedirectResult()
      let user = auth.currentUser
      if (result.credential && user) {
        this.$router.push({ name: 'menu-list' })
      }
    } catch (error) {
      this.$message.error(error.message)
    }
  },
  methods: {
    handleSignInFacebook () {
      let provider = new auth.FacebookAuthProvider()
      auth.signInWithRedirect(provider)
    }
  }
}
</script>

<style scoped>
.card {
  text-align: center;
  padding: 20px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  -webkit-transition: .3s;
  transition: .3s;
  border-radius: 4px;
}
</style>
