<template>
  <div>
    <div v-if="mainMenu">
      <el-button icon="el-icon-plus" @click="redirect('menu-form')" circle/>
      <Menu :menus="menus" @setCurMenuIndex="setCurMenuIndex"/>
    </div>
    <div v-else>
      <el-button icon="el-icon-arrow-left" @click="backMainMenu"></el-button>
      <pre>{{menus[menuIndex]}}</pre>
      <pre>{{items}}</pre>
      <p><strong>menu id</strong>  {{menus[menuIndex].id}}<p>
      <h1>{{menus[menuIndex].data.name}}</h1>
      <p>{{menus[menuIndex].data.desc}}</p>
      <el-input :disabled="isDisable" placeholder="Please input" v-model="inputItem" @keyup.enter.native="handleAddInput" clearable>
        <el-button :disabled="isDisable" slot="append" icon="el-icon-plus" @click.stop="handleAddInput"></el-button>
      </el-input>
      <MenuDetail :items="items"/>
    </div>
  </div>
</template>

<script>
import Menu from '../components/Menu'
import MenuDetail from '../components/MenuDetail'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Menu,
    MenuDetail
  },
  data () {
    return {
      inputItem: '',
      isDisable: false,
      mainMenu: true
    }
  },
  computed: {
    ...mapGetters({
      menus: 'Menus/getMenus',
      menuIndex: 'Menus/getMenuIndex',
      items: 'Items/getItems'
    }),
  },
  created () {
    this.setMenusListener()
    this.setItemsListener()
    this.fetchMenus()
  },
  destroyed () {
    this.removeMenusListener()
    this.removeItemsListener()
  },
  methods: {
    ...mapActions({
      fetchMenus: 'Menus/fetchMenus',
      assignMenuIndex: 'Menus/assignMenuIndex',
      setMenusListener: 'Menus/setMenusListener',
      removeMenusListener: 'Menus/removeMenusListener',
      fetchItems: 'Items/fetchItems',
      createItem: 'Items/createItem',
      setItemsListener: 'Items/setItemsListener',
      removeItemsListener: 'Items/removeItemsListener',
    }),
    setCurMenuIndex (index) {
      this.fetchItems(this.menus[index].id)
      this.assignMenuIndex(index)
      this.mainMenu = false
    },
    backMainMenu () {
      this.mainMenu = true
      this.assignMenuIndex(null)
    },
    redirect (routeName) {
      this.$router.push({ name: routeName })
    },
    async handleAddInput () {
      this.isDisable = true
      if (this.inputItem && this.isDisable) {
        let payload = {
          menu_id: this.menus[this.menuIndex].id,
          consumers: [],
          item_name: this.inputItem
        }
        try {
          let docRef = await this.createItem(payload)
          this.inputItem = ''
          this.$message.success('added')
          this.isDisable = false
        } catch (error) {
          this.$message.error('add fail')
          this.isDisable = false
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
