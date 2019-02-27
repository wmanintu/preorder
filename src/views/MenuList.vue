<template>
  <div>
    <div v-if="mainMenu">
      <el-button type="primary" @click="goToCreate">Create</el-button>
      <div class="card" v-for="(menu, index) in menus" :key="index" @click="handleClickMenu(index)">
        <div>
          <h1>{{menu.data.title}}</h1>
          <img class="creater-image" :src="menu.data.photoURL"/>
          <p></p>
        </div>
      </div>
    </div>
    <div v-else>
      <el-button type="primary" @click="backMainMenu">back</el-button>
      <pre>{{menus[selectIndex]}}</pre>
      <h1>{{menus[selectIndex].data.title}}</h1>
      <div v-for="(item, index) in menus[selectIndex].data.items" :key="index">
        <el-col>
          {{item.itemName}}
          <el-input-number
            v-model="item.quantity"
            @change="handleChange"
            :min="0"
            :max="10"
            ></el-input-number>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      selectIndex: null,
      mainMenu: true,
      num1: 0
    }
  },
  computed: {
    ...mapGetters({
      menus: 'Menus/getMenus'
    }),
  },
  created () {
    this.setMenusListener()
    this.fetchMenus()
  },
  destroyed () {
    this.removeMenusListener()
  },
  methods: {
    ...mapActions({
      fetchMenus: 'Menus/fetchMenus',
      setMenusListener: 'Menus/setMenusListener',
      removeMenusListener: 'Menus/removeMenusListener'
    }),
    goToCreate () {
      this.$router.push({ name: 'create-menu' })
    },
    handleChange(value) {
      console.log(value)
      if (value > 0) {
        // update to consumers ex. { name: 'Wut Manintu',  amount: '1' }
      } else {
        // remove from consumers
      }
    },
    handleClickMenu (preorderIndex) {
      this.selectIndex = preorderIndex
      this.mainMenu = false
    },
    backMainMenu () {
      this.mainMenu = true
      this.selectIndex = null
    }
  }
}
</script>

<style scoped>
.creater-image {
  border-radius: 30px;
}
.card {
  padding: 20px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  -webkit-transition: .3s;
  transition: .3s;
  border-radius: 4px;
  overflow: hidden;
}
.card:hover {
  cursor: pointer;
  background-color: grey;
}
</style>
