import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import firebase from 'firebase/app'
import 'firebase/auth'

var config = {
  apiKey: 'AIzaSyAWnAZ0fkL7Tb7rd9m8SzYaSdjXp8hGau0',
  authDomain: 'preorder-8a6e9.firebaseapp.com',
  databaseURL: 'https://preorder-8a6e9.firebaseio.com',
  projectId: 'preorder-8a6e9',
  storageBucket: 'preorder-8a6e9.appspot.com',
  messagingSenderId: '762948999290'
}
firebase.initializeApp(config)

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
