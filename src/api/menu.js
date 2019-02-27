import { db } from '../firebase'

export default {
  async getMenus () {
    try {
      console.log('a')
      // let doc = await db.collection('menus')
      // .doc('5khnP2auhuAqxjgiPtxf')
      // .get()
      // console.log('doc =>', doc.data)
      let doc = await db.collection('menus')
      .doc('5khnP2auhuAqxjgiPtxf')
      .collection('items')
      .doc('5khnP2auhuAqxjgiPtxf')
      .get()
      console.log('doc =>', doc.data)
      let querySnapshot = await db.collection('menus').get()
      return querySnapshot
    } catch (error) {
      return error
    }
  },
  async createMenu (data) {
    try {
      let docRef = await db.collection('menus').add(data)
      return docRef
    } catch (error) {
      return error
    }
  },
}