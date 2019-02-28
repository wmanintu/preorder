<template>
  <div class="input-container">
    <el-button icon="el-icon-minus" circle></el-button>
    <div class="amount-text">0</div>
    <el-button class="" icon="el-icon-plus" circle></el-button>
  </div>
</template>

<script>
export default {
  props: [ 'item' ]
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