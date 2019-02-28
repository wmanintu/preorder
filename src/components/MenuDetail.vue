<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      <div class="item-container">
        <strong>{{item.data.item_name}}</strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'items' ]
}
</script>

<style scoped>
.item-container {
  margin: 10px 0px;
  font-size: 25px;
}
</style>
