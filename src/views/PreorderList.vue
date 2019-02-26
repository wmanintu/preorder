<template>
  <div>
    <div v-if="mainMenu">
      <div class="card" v-for="(preorder, index) in preorders" :key="index" @click="handleClickMenu(index)">
        <div>
          <!-- <pre>{{preorder}}</pre> -->
          <h1>{{preorder.data.title}}</h1>
          <img class="creater-image" :src="preorder.data.photoURL"/>
          <p></p>
        </div>
      </div>
    </div>
    <div v-else>
      <el-button type="primary" @click="backMainMenu">back</el-button>
      <pre>{{preorders[selectIndex]}}</pre>
      <h1>{{preorders[selectIndex].data.title}}</h1>
      <div v-for="(item, index) in preorders[selectIndex].data.menu" :key="index">
        <el-col>
          {{item.itemName}}
          <el-input-number v-model="num1" @change="handleChange" :min="0" :max="10"></el-input-number>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'
export default {
  data () {
    return {
      preorders: [],
      selectIndex: null,
      mainMenu: true,
      num1: 0
    }
  },
  created () {
    this.setPreordersListener()
    this.getPreorders()
  },
  destroyed () {
    this.removePreordersListener()
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    async getPreorders () {
      try {
        var querySnapshot = await db.collection('orders').get()
        if (querySnapshot.empty) {
          this.preorders = []
        } else {
          this.preorders = querySnapshot.docs.map(doc => {
            return {id: doc.id, data: doc.data()}
          })
        }
      } catch (error) {
        this.preorders = []
      }
    },
    setPreordersListener () {
      db.collection('orders').onSnapshot(snapshot => {
        snapshot.docChanges().forEach((change) => {
          switch (change.type) {
            case 'add':
              console.log("Add: ", change.doc.data())
              break
            case 'modified':
              console.log("Modified: ", change.doc.data())
              break
            case 'removed':
              console.log("Removed: ", change.doc.data())
              break
          }
        })
      }, error => {
        console.log('listener', error)
      })
    },
    removePreordersListener () {
      var unsubscribe = db.collection('orders').onSnapshot(function () {})
      // ...
      // Stop listening to changes
      unsubscribe()
    },
    handleClickMenu (preorderIndex) {
      console.log('index', preorderIndex)
      this.selectIndex = preorderIndex
      this.mainMenu = false
    },
    backMainMenu () {
      this.mainMenu = true
      this.selectIndex = null
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
