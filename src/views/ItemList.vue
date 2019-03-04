<template>
  <div>
    <el-button icon="el-icon-arrow-left" @click="backMainMenu"></el-button>
    <Menu :menu="menu"/>
    <el-input :disabled="isDisable" placeholder="Add item here" v-model="inputItem" @keyup.enter.native="handleAddInput" clearable>
      <el-button :disabled="isDisable" slot="append" icon="el-icon-plus" @click.stop="handleAddInput"></el-button>
    </el-input>
    <el-tabs v-model="activeName">
      <el-tab-pane label="Yours" name="first">
        <div v-for="(item, index) in items" :key="index">
          <el-col>
            <el-col :span="12">
              <Item :item="item"/>
              <div class="consumer-name" v-for="(consumer, cindex) in item.consumers" :key="cindex">
                {{consumer.user_display_name}}<span v-if="cindex !== item.consumers.length - 1">,</span>
              </div>
            </el-col>
            <el-col :span="12">
              <AmountInput @handleAmountInput="handleAmountInput" :item="item" :index="index"/>
            </el-col>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Details" name="second">Config</el-tab-pane>
    </el-tabs>
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
      isDisable: false,
      activeName: 'first'
    }
  },
  computed: {
    ...mapGetters({
      menu: 'Menus/getMenu',
      items: 'Items/getItems'
    }),
  },
  created () {
    this.setMenuListener(this.menuId)
    this.setItemsListener(this.menuId)
  },
  beforeDestroy () {
    this.unsubMenuListener()
    this.unsubItemsListener()
    this.unsubConsumers()
  },
  methods: {
    ...mapActions({
      setMenuListener: 'Menus/setMenuListener',
      unsubMenuListener: 'Menus/unsubMenuListener',
      createItem: 'Items/createItem',
      setItemsListener: 'Items/setItemsListener',
      unsubItemsListener: 'Items/unsubItemsListener',
      unsubConsumers: 'Items/unsubConsumers'
    }),
    backMainMenu () {
      this.$router.push({ name: 'menu-list' })
    },
    redirect (routeName) {
      this.$router.push({ name: routeName })
    },
    handleAmountInput (data) {
      switch (data.type) {
        case 'add':
          this.updateItemQuantity({
            itemId: data.index,
            itemIndex: data.id,
            amount: 1
          })
          break
        case 'subtract':
          this.updateItemQuantity({
            itemId: data.index,
            itemIndex: data.id,
            amount: 1
          })
          break
        default:
          this.updateItemQuantity({
            itemId: data.index,
            itemIndex: data.id,
            amount: 1
          })
          break
      }
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
.consumer-name {
  font-size: 12px;
  font-style: italic;
  display: inline;
}
</style>
