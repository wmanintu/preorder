<template>
  <div v-if="item.total > 0">
    <el-col>
      <el-col :span="12">
        <h3>{{item.name}}</h3>
      </el-col>
      <el-col :span="12">
        <h3 style="text-align: right;">{{item.total}}</h3>
      </el-col>
    </el-col>
    <div v-for="(consumer, index) in item.consumers" :key="index">
      <div class="consumer-name">{{consumer}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'item' ]
}
</script>

<style>
.consumer-name {
  font-style: italic;
  font-size: 12px;
}
</style>
