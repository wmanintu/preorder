<template>
  <div>
    <div v-if="mainMenu">
      <Menu :menus="menus" @setSelectIndex="setSelectIndex"/>
    </div>
    <div v-else>
      <el-button type="primary" @click="backMainMenu">back</el-button>
      <pre>{{menus[selectIndex]}}</pre>
      <pre>{{items}}</pre>
      <p><strong>menu id</strong>  {{menus[selectIndex].id}}<p>
      <h1>{{menus[selectIndex].data.name}}</h1>
      <div v-for="(item, iIndex) in items" :key="iIndex">
        {{item.data.item_name}}
        <div v-for="(consumer, cIndex) in item.data.consumers" :key="cIndex">
          {{consumer}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '../components/Menu'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Menu
  },
  data () {
    return {
      selectIndex: null,
      mainMenu: true,
      num1: 0
    }
  },
  computed: {
    ...mapGetters({
      menus: 'Menus/getMenus',
      items: 'Items/getItems'
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
      removeMenusListener: 'Menus/removeMenusListener',
      fetchItems: 'Items/fetchItems'
    }),
    handleChange(value) {
      console.log(value)
      if (value > 0) {
        // update to consumers ex. { name: 'Wut Manintu',  amount: '1' }
      } else {
        // remove from consumers
      }
    },
    setSelectIndex (index) {
      this.fetchItems(this.menus[index].id)
      this.selectIndex = index
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
