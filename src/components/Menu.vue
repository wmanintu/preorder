<template>
  <div>
    <div class="card" v-for="(menu, index) in menus" :key="index" @click.stop="handleClickMenu(index)">
      <div>
        <h1>{{menu.data.name}}</h1>
        <img class="creater-image" :src="menu.data.photoURL"/>
        <p>{{menu.data.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'menus' ],
  methods: {
    handleClickMenu (index) {
      this.$emit('setCurMenuIndex', index)
    }
  }
}
</script>

<style scoped>
.creater-image {
  border-radius: 30px;
}
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
</style>
