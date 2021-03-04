import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'preorder-8a6e9.firebaseapp.com',
  databaseURL: 'https://preorder-8a6e9.firebaseio.com',
  projectId: 'preorder-8a6e9',
  storageBucket: 'preorder-8a6e9.appspot.com',
  messagingSenderId: '762948999290'
}

firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const authProvider = firebase.auth
const currentUser = auth.currentUser

// firebase collections
const consumersCollection = db.collection('consumers')
const itemsCollection = db.collection('items')
const menusCollection = db.collection('menus')

export {
  db,
  auth,
  authProvider,
  currentUser,
  consumersCollection,
  itemsCollection,
  menusCollection
}
