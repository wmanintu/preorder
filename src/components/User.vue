<template>
  <div class="user-container">
    <img class="user-image" :src="photoUrl">
    <h4 class="user-name"><b>{{displayName}}</b></h4>
  </div>
</template>

<script>
  export default {
    props: [ 'displayName', 'photoUrl' ]
  }
</script>

<style scoped>
.user-container {
  border: 1px solid #eeeeee;
  padding: 5px 10px;
  border-radius: 5px;
}
.user-image {
  float: left;
  margin: 5px;
  border-radius: 30px;
}
.user-name {
  text-align: left;
}
</style>
