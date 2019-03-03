<template>
  <div class="input-container">
    <el-button :disabled="item.amountInput === 0" @click="handleAmountInput('minus')" icon="el-icon-minus" circle></el-button>
    <div class="amount-text">{{item.amountInput}}</div>
    <el-button @click="handleAmountInput('add')" icon="el-icon-plus" circle></el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {

  props: [ 'item', 'index' ],
  methods: {
    ...mapActions({
      updateItemQuantity: 'Items/updateItemQuantity'
    }),
    handleAmountInput (type) {
      this.updateItemQuantity({
        itemId: this.item.id,
        itemAmount: this.item.amountInput,
        menuId: this.item.data.menu_id,
        itemIndex: this.index,
        type: type
      })
    }
  }
}
</script>

<style scoped>
.input-container {
  margin: 10px 0px;
  text-align: right;
  line-height: 40px;
}
.amount-text {
  line-height: 40px;
  vertical-align: -6px;
  font-size: 35px;
  margin: 0px 20px;
  display: inline-block;
}
</style>