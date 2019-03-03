<template>
  <div>
    <div style="text-align: right; margin-bottom: 10px;">
      <el-button type="primary" icon="el-icon-plus" @click="redirect('menu-form')" circle/>
    </div>
    <div class="card" v-for="(menu, index) in menus" :key="index" @click="goToItemList(menus[index].id)">
      <Menu :menu="menu"/>
    </div>
  </div>
</template>

<script>
import Menu from '../components/Menu'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Menu
  },
  data () {
    return {
      inputItem: '',
      isDisable: false
    }
  },
  computed: {
    ...mapGetters({
      menus: 'Menus/getMenus'
    }),
  },
  created () {
    this.setMenusListener()
  },
  beforeDestroy () {
    this.unsubMenusListener()
  },
  methods: {
    ...mapActions({
      setMenusListener: 'Menus/setMenusListener',
      unsubMenusListener: 'Menus/unsubMenusListener'
    }),
    goToItemList (menuId) {
      this.$router.push({ name: 'item-list', params: { menuId: menuId } })
    },
    redirect (routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>

<style scoped>
.card {
  padding: 20px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  -webkit-transition: .3s;
  transition: .3s;
  border-radius: 4px;
}
.card:hover {
  cursor: pointer;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.6);
}
</style>
