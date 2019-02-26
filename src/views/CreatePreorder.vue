<template>
  <el-card style="padding:15px;">
    <h1>CREATE MENU</h1>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="12"><el-input v-model="form.title" placeholder="What's the title of this menu?"/></el-col>
      <el-col :xs="24" :sm="12"><el-date-picker v-model="form.endDate" type="datetime" placeholder="Select expire date"></el-date-picker></el-col>
    </el-row>
    <el-input class="menu-input" v-model="value" placeholder="What's on the menu?" @keyup.enter.native="addToOrders(value)">
      <el-button slot="append" icon="el-icon-plus" type="primary" @click="addToOrders(value)" round></el-button>
    </el-input>
    <div v-show="form.orders.length > 0">
      <div v-for="(item, index) in form.orders" :key="item.id">
        <div class="item-container">
          <div class="item-text">{{item}}</div>
          <div class="item-button">
            <el-button type="danger" icon="el-icon-close" @click="removeFromOrders(index)" circle></el-button>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 15px;">
      <el-col :span="12">
        <el-button>cancel</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button type="primary" @click="submitOrder">create</el-button>
      </el-col>
    </div>
    <br>
    <pre>{{snapshot}}</pre>
  </el-card>
</template>

<script>
import { db } from '../firebase'
export default {
  data () {
    return {
      value: '',
      snapshot: null,
      form: {
        title: '',
        endDate: '',
        orders: []
      }
    }
  },
  methods: {
    addToOrders (data) {
      if (data) {
        this.form.orders.push(data)
        this.clearTextInput()
      }
    },
    clearTextInput () {
      this.value = ''
    },
    removeFromOrders (index) {
      this.form.orders.splice(index, 1)
    },
    async submitOrder () {
      let createOrderData = {
        title: 'Dinner',
        createdTime: '10:00 pm',
        photoURL: 'https://graph.facebook.com/10154169314314322/picture',
        createdBy: 'Wut Manintu',
        expireTime: '11:00 pm',
        menu: [
          {
            itemName: 'sandwish',
            consumers: [
              {
                name: 'David',
                quantity: 1
              },
              {
                name: 'Susan',
                quantity: 1
              },
              {
                name: 'Wut Manintu',
                quantity: 2
              }
            ]
          }
        ]
      }
      try {
        let docRef = await db.collection('orders').add(createOrderData)
        console.log('Document written with ID: ', docRef)
      } catch (error) {
        console.error('Error adding document: ', error)
      }
    },
    handleCancel () {
      // TODO
      // clear form
      // return to order list
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
