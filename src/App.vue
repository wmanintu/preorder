<template>
  <div id="app">
    <el-row :gutter="10">
      <el-col class="hidden-xs-only" :sm="14" :md="16" :lg="20">
        <h1></h1>
      </el-col>
      <el-col :xs="24" :sm="10" :md="8" :lg="4">
        <div v-if="user" style="text-align: right;">
          <User :displayName="user.displayName" :photoUrl="user.photoUrl"/>
          <el-button type="text" @click.prevent="handleSignOut">Sign out</el-button>
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
import { auth } from './config/firebase'
import User from './components/User'
export default {
  name: 'app',
  components: { User },
  computed: {
    ...mapGetters({
      user: 'Users/getUser'
    })
  },
  async created () {
    this.setUserLoading(true)
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setUser({
          id: user.uid,
          displayName: user.displayName,
          photoUrl: user.photoURL
        })
        if(this.$route.name === 'login' || this.$route.name === 'non-existing') {
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
      setUser: 'Users/setUser',
      setUserLoading: 'Users/setLoading'
    }),
    async handleSignOut () {
      try {
        this.setUser(null)
        await auth.signOut()
        this.$router.push({ name: 'login' })
      } catch (error) {
        this.$message.error('signout error')
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
