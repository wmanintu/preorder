<template>
  <el-card style="padding:15px;">

    <h1>CREATE MENU</h1>

    <el-row :gutter="15">
      <el-col :xs="24" :sm="12"><el-input v-model="title" placeholder="What's the title of this menu?"/></el-col>
      <el-col :xs="24" :sm="12"><el-date-picker v-model="endDate" type="datetime" placeholder="Select expire date"></el-date-picker></el-col>
    </el-row>
    
    <el-input class="menu-input" v-model="value" placeholder="What's on the menu?" @keyup.enter.native="addToOrders(value)">
      <el-button slot="append" icon="el-icon-plus" type="primary" @click="addToOrders(value)" round></el-button>
    </el-input>
    
    <div v-show="orders.length > 0">
      <div v-for="(item, index) in orders" :key="item.id">
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
    
    <pre>{{output}}</pre>

  </el-card>
</template>

<script>
import axios from 'axios'
import { getCookie } from '../util/cookies'

export default {
  data () {
    return {
      key: 'value',
      orders: [],
      value: '',
      title: '',
      endDate: '',
      output: ''
    }
  },
  methods: {
    addToOrders (data) {
      if (data) {
        this.orders.push(data)
        this.clearTextInput()
      }
    },
    clearTextInput () {
      this.value = ''
    },
    removeFromOrders (index) {
      this.orders.splice(index, 1)
    },
    submitOrder () {
      let createOrderData = {}
      firebase.database().ref('orders/order').key().set(createOrderData)
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
