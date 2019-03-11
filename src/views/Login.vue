<template>
  <div>
    <el-col class="card">
        <div class="title-text">
          Pre<br>
          Order</div>
        <el-button type="primary" @click.prevent="handleSignInFacebook" :loading="userLoading">
          <i class="fab fa-facebook"></i> Sign in with Facebook
        </el-button>
    </el-col>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { auth, authProvider } from '../config/firebase'
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
      let provider = new authProvider.FacebookAuthProvider()
      auth.signInWithRedirect(provider)
    }
  }
}
</script>

<style scoped>
.card {
  text-align: center;
  padding: 20px;
  background-color: #fff;
  -webkit-transition: .3s;
  transition: .3s;
  border-radius: 4px;
}
.title-text {
  font-size: 130px;
  font-weight: bold;
  margin: 25px 0px;
}
@media only screen and (max-width: 320px) {
  .title-text {
    font-size: 90px;
  }
}
</style>
