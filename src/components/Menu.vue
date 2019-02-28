<template>
  <div>
    <h1>{{menu.data.name || ''}}</h1>
    <p>{{menu.data.desc || ''}}</p>
  </div>
</template>

<script>
export default {
  props: [ 'menu' ]
}
</script>

<style scoped>
</style>
