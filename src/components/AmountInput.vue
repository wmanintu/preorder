<template>
  <div class="input-container">
    <el-button class="minus" :disabled="item.amount === 0" @click="handleAmountInput('minus')" icon="el-icon-minus" circle />
    <div :class="item.amount > 0 ? 'amount-text-blue' : 'amount-text'">{{item.amount}}</div>
    <el-button class="plus-button" @click="handleAmountInput('add')" icon="el-icon-plus" circle />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { auth } from '../config/firebase'
export default {
  props: [ 'item', 'index' ],
  data () {
    return {
      auth: auth
    }
  },
  methods: {
    ...mapActions({
      updateConsumer: 'Consumers/updateConsumer',
      createConsumer: 'Consumers/createConsumer'
    }),
    handleAmountInput (type) {
      let consumer = this.findExistingConsumer()
      if (consumer) {
        let updatePayload = this.createUpdateConsumerPayload(type, consumer.consumerId)
        this.updateConsumer(updatePayload)
      } else {
        let createPayload = this.createNewConsumerPayload()
        this.createConsumer(createPayload)
      }
    },
    findExistingConsumer () {
      return this.item.consumers.find(consumer => consumer.user_id === this.auth.currentUser.uid)
    },
    createNewConsumerPayload () {
      return {
        item_id: this.item.id,
        menu_id: this.item.menu_id,
        user_id: this.auth.currentUser.uid,
        user_display_name: this.auth.currentUser.displayName,
        amount: 1
      }
    },
    createUpdateConsumerPayload (type, consumerId) {
      return {
        item_id: this.item.id,
        menu_id: this.item.menu_id,
        user_id: this.auth.currentUser.uid,
        user_display_name: this.auth.currentUser.displayName,
        consumerId: consumerId,
        type: type
      }
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
.amount-text-blue {
  line-height: 40px;
  vertical-align: -6px;
  font-size: 35px;
  margin: 0px 20px;
  display: inline-block;
  color: #00b250;
}
</style>
