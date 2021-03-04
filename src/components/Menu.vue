<template>
  <div>
    <h1>{{menu.data.name}}</h1>
    <div class="time">{{formatTimestamp(menu.data.timestamp)}}</div>
    <p>{{menu.data.desc}}</p>
  </div>
</template>

<script>
import { formatUnixTimestamp } from '../util/formatDateTime'
export default {
  props: [ 'menu' ],
  methods: {
    formatTimestamp (timestamp) {
      if (timestamp) {
        return formatUnixTimestamp(timestamp.seconds)
      }
    }
  }
}

</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}
</style>
