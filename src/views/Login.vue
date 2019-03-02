<template>
  <div>
    <el-button type="primary" @click="signInFacebook" :loading="userLoading">
      <i class="fab fa-facebook"></i> Sign in with Facebook
    </el-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      userLoading: 'Users/getLoading'
    })
  },
  methods: {
    ...mapActions({
      signInFacebook: 'Users/signInFacebook'
    })
  }
}
</script>

<style>

</style>
