<template>
  <div id="app">
    <el-row :gutter="10">
      <el-col class="hidden-xs-only" :sm="14" :md="16" :lg="20">
        <h1></h1>
      </el-col>
      <el-col :xs="24" :sm="10" :md="8" :lg="4">
        <div v-if="user" style="text-align: right;">
          <User :displayName="user.displayName" :photoUrl="user.photoUrl"/>
          <el-button type="text" @click="handleSignOut" :loading="isSignOut">Sign out</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="{span: 14, offset: 5}" :md="{span: 12, offset: 6}">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase'
import User from './components/User'
export default {
  name: 'app',
  components: { User },
  computed: {
    ...mapGetters({
      user: 'Users/getUser'
    })
  },
  data () {
    return {
      isSignOut: false
    }
  },
  async created () {
    this.setUserLoading(true)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUser({
          id: user.uid,
          displayName: user.displayName,
          photoUrl: user.photoURL
        })
        if(this.$route.name === 'login') {
          this.$router.push({ name: 'menu-list' })
        }
        this.setUserLoading(false)
      } else {
        this.setUserLoading(false)
        this.$router.push({ name: 'login' })
      }
    })
  },
  methods: {
    ...mapActions({
      signOut: 'Users/signOut',
      setUser: 'Users/setUser',
      setUserLoading: 'Users/setLoading',
      onAuthStateChanged: 'Users/onAuthStateChanged'
    }),
    async handleSignOut () {
      if (!this.isSignOut) {
        this.isSignOut = true
        try {
          await this.signOut()
          this.isSignOut = false
          this.$router.push({ name: 'login' })
        } catch (error) {
          this.isSignOut = false
          this.$message.error('signout error')
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
