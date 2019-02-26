import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
  apiKey: 'AIzaSyAWnAZ0fkL7Tb7rd9m8SzYaSdjXp8hGau0',
  authDomain: 'preorder-8a6e9.firebaseapp.com',
  databaseURL: 'https://preorder-8a6e9.firebaseio.com',
  projectId: 'preorder-8a6e9',
  storageBucket: 'preorder-8a6e9.appspot.com',
  messagingSenderId: '762948999290'
}

const firebaseApp = firebase.initializeApp(config)

export const db = firebaseApp.firestore()