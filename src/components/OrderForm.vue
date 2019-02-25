<template>
    <div>
        <h1>MENU</h1>
        <el-input class="title-input" v-model="title" placeholder="What's the title of this menu?"/>
        <el-input class="menu-input" v-model="value" placeholder="What's on the menu?" @keyup.enter.native="addToOrders(value)">
          <el-button slot="append" icon="el-icon-plus" type="primary" @click="addToOrders(value)" round></el-button>
        </el-input>
        <el-date-picker
          v-model="endDate"
          type="datetime"
          placeholder="Select date and time">
        </el-date-picker>
        <el-card shadow="always" v-show="orders.length > 0">
        <div v-for="(item, index) in orders" :key="item.id">
          <div class="item-container">
            <div class="item-text">{{item}}</div>
            <div class="item-button">
              <el-button type="danger" icon="el-icon-close" @click="removeFromOrders(index)" circle></el-button>
            </div>
          </div>
        </div>
        </el-card>
        <el-button type="primary" @click="submitOrder">create</el-button>
        <el-button>cancel</el-button>
        <pre>{{output}}</pre>
    </div>
</template>

<script>
import axios from 'axios'
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
        this.value = ''
      }
    },
    removeFromOrders (index) {
      this.orders.splice(index, 1)
    },
    async submitOrder () {
      this.$message('This is a message.')
      try {
        let res = await axios.post('http://localhost:3000/api/Orders', {
          title: this.title,
          start_date: new Date(),
          end_date: new Date(),
          created_by: 'Wut Manintu',
          menu_list: this.orders.map(element => {
            return {
              item_name: element,
              consumer_list: []
            }
          })
        })
        this.$message('succ')
        return res
      } catch (error) {
        this.$message('error')
        this.output = error
        return error
      }
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
</style>
