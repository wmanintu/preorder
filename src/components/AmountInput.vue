<template>
  <div class="input-container">
    <el-button @click="handleAmountInput('substract')" icon="el-icon-minus" circle></el-button>
    <div class="amount-text">0</div>
    <el-button @click="handleAmountInput('add')" icon="el-icon-plus" circle></el-button>
  </div>
</template>

<script>
export default {
  props: [ 'item', 'index' ],
  methods: {
    handleAmountInput (type) {
      this.$emit('handleAmountInput', {
        type: type,
        id: this.item.id,
        index: this.index
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