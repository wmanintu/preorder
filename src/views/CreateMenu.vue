<template>
  <el-card style="padding:15px;">
    <h1>CREATE MENU</h1>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="12"><el-input v-model="form.title" placeholder="What's the title of this menu?"/></el-col>
      <el-col :xs="24" :sm="12">
        <el-date-picker value-format="timestamp" v-model="form.expireTime" type="datetime" placeholder="Select expire date">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-input class="menu-input" v-model="value" placeholder="What's on the menu?" @keyup.enter.native="addToOrders(value)">
      <el-button slot="append" icon="el-icon-plus" type="primary" @click="addToOrders(value)" round></el-button>
    </el-input>
    <div v-show="form.items.length > 0">
      <div v-for="(item, index) in form.items" :key="item.id">
        <div class="item-container">
          <div class="item-text">{{item.itemName}}</div>
          <div class="item-button">
            <el-button type="danger" icon="el-icon-close" @click="removeFromOrders(index)" circle></el-button>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 15px;">
      <el-col :span="12">
        <el-button @click="handleCancel">cancel</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button type="primary" @click="handleCreate">create</el-button>
      </el-col>
    </div>
    <br>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex'
import firebase from 'firebase'
export default {
  data () {
    return {
      value: '',
      snapshot: null,
      form: {
        title: '',
        uid: '',
        createBy: '',
        photoUrl: '',
        createTime: '',
        expireTime: '',
        items: []
      }
    }
  },
  methods: {
    ...mapActions({
      createMenu: 'Menus/createMenu'
    }),
    addToOrders (name) {
      if (name) {
        this.form.items.push({ itemName: name, consumers: [] })
        this.clearTextInput()
      }
    },
    clearTextInput () {
      this.value = ''
    },
    removeFromOrders (index) {
      this.form.orders.splice(index, 1)
    },
    async handleCreate () {
      let user = firebase.auth().currentUser
      this.form.createTime = Date.now()
      this.form.createBy = user.displayName
      this.form.photoUrl = user.photoURL

      try {
        console.log('c', this.form)
        let docRef = await this.createMenu(this.form)
        console.log('Document written with ID: ', docRef.id)
        this.$router.push({ name: 'menu-list' })
      } catch (error) {
        console.error('Error adding document: ', error)
      }
    },
    handleCancel () {
      // TODO
      // clear form
      this.$router.push({ name: 'menu-list' })
    }
  }
}
</script>

<style scoped>
.title-input {
  padding: 5px 0px;
}
.menu-input {
  padding: 5px 0px;
}
.item-text {
  float: left;
  padding-top: 10px;
}
.item-button {
  float: right;
}
.item-container {
  display: flow-root;
  padding: 10px 0px;
  border-bottom: 1px solid #eeeeee;
}
.item-container:last-child {
  display: flow-root;
  padding: 10px 0px;
  border-bottom: 0;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
</style>
