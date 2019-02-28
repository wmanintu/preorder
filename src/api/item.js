import { db } from '../firebase'

export default {
  async getItems (menuId) {
    try {
      let querySnapshot = await db.collection('items').where('menu_id', '==', menuId).get()
      return querySnapshot
    } catch (error) {
      return error
    }
  },
  async createItem (payload) {
    try {
      let docRef = await db.collection('items').add(payload)
      return docRef
    } catch (error) {
      return error
    }
  },
  async deleteItem (itemId) {
    try {
      let docRef = await db.collection('menus').doc(itemId).delete()
      return docRef
    } catch (error) {
      return error
    }
  }
}
