<template>
  <div>
    <h3>{{consumer.user_display_name}}</h3>
    <el-row v-for="(item, index) in consumer.item_id_list" :key="index">
      <el-col :span="12">
        <div class="item-name">{{item.item_name}}</div>
      </el-col>
      <el-col :span="12">
        <div class="item-amount">{{item.amount}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['consumer']
}
</script>

<style scoped>
.item-amount {
  text-align: right;
}
.item-name {
  font-style: italic;
}
</style>
