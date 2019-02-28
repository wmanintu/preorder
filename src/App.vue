<template>
  <div id="app">
    <el-row :gutter="10">
      <el-col class="hidden-xs-only" :sm="14" :md="16" :lg="20">
        <h1></h1>
      </el-col>
      <el-col :xs="24" :sm="10" :md="8" :lg="4"><Login></Login></el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="{span: 14, offset: 5}" :md="{span: 12, offset: 6}">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Login from './components/Login'
export default {
  name: 'app',
  components: { Login }
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
