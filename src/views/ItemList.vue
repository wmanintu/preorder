<template>
  <div>
    <el-button icon="el-icon-arrow-left" @click="backMainMenu"></el-button>
    <Menu :menu="menu"/>
    <el-input :disabled="isDisable" placeholder="Please input" v-model="inputItem" @keyup.enter.native="handleAddInput" clearable>
      <el-button :disabled="isDisable" slot="append" icon="el-icon-plus" @click.stop="handleAddInput"></el-button>
    </el-input>
    <div v-for="(item, index) in items" :key="index">
      <el-col>
        <el-col :span="12">
          <Item :item="item"/>
        </el-col>
        <el-col :span="12">
          <AmountInput/>
        </el-col>
      </el-col>
    </div>
  </div>
</template>

<script>
import Menu from '../components/Menu'
import Item from '../components/Item'
import AmountInput from '../components/AmountInput'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Menu,
    Item,
    AmountInput
  },
  props: [ 'menuId' ],
  data () {
    return {
      inputItem: '',
      isDisable: false
    }
  },
  computed: {
    ...mapGetters({
      menu: 'Menus/getMenu',
      menuIndex: 'Menus/getMenuIndex',
      items: 'Items/getItems'
    }),
  },
  created () {
    this.setMenuListener(this.menuId)
    this.setItemsListener(this.menuId)
  },
  beforeDestroy () {
    this.removeMenuListener(this.menuId)
    this.removeItemsListener(this.menuId)
  },
  methods: {
    ...mapActions({
      setMenuListener: 'Menus/setMenuListener',
      removeMenuListener: 'Menus/removeMenuListener',
      createItem: 'Items/createItem',
      setItemsListener: 'Items/setItemsListener',
      removeItemsListener: 'Items/removeItemsListener',
    }),
    backMainMenu () {
      this.$router.push({ name: 'menu-list' })
    },
    redirect (routeName) {
      this.$router.push({ name: routeName })
    },
    async handleAddInput () {
      this.isDisable = true
      if (this.inputItem && this.isDisable) {
        let payload = {
          menu_id: this.menu.id,
          consumers: {},
          item_name: this.inputItem
        }
        try {
          await this.createItem(payload)
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
