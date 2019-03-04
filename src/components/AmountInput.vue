<template>
  <div class="input-container">
    <el-button :disabled="item.amount === 0" @click.prevent="handleAmountInput('minus')" icon="el-icon-minus" circle></el-button>
    <div class="amount-text">{{item.amount}}</div>
    <el-button @click.prevent="handleAmountInput('add')" icon="el-icon-plus" circle></el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { auth } from '../config/firebase'
export default {
  props: [ 'item', 'index' ],
  methods: {
    ...mapActions({
      updateConsumer: 'Consumers/updateConsumer',
      createConsumer: 'Consumers/createConsumer'
    }),
    handleAmountInput (type) {
      let isExistingConsumer = this.findExistingConsumer()
      let payload = {
        item_id: this.item.id,
        menu_id: this.item.menu_id,
        user_id: auth.currentUser.uid,
        user_display_name: auth.currentUser.displayName
      }
      
      if (isExistingConsumer) {
        payload.consumerId = isExistingConsumer.consumerId
        payload.type = type
        this.updateConsumer(payload)
      } else {
        payload.amount = 1
        this.createConsumer(payload)
      }
    },
    findExistingConsumer () {
      return this.item.consumers.find(consumer => consumer.user_id === auth.currentUser.uid)
    }
  }
}
</script>

<style scoped>
.input-container {
  margin: 10px 0px;
  text-align: right;
  line-height: 40px;
}
.amount-text {
  line-height: 40px;
  vertical-align: -6px;
  font-size: 35px;
  margin: 0px 20px;
  display: inline-block;
}
</style>