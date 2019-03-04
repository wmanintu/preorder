<template>
  <div class="item-container">
    <strong>{{item.item_name}}</strong>
  </div>
</template>

<script>
export default {
  props: [ 'item' ]
}
</script>

<style scoped>
.item-container {
  margin: 10px 0px;
  font-size: 25px;
}
</style>
