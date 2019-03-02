import { itemsCollection } from '../config/firebase'

export default {
  async getItems (menuId) {
    try {
      let querySnapshot = await itemsCollection.where('menu_id', '==', menuId).get()
      return querySnapshot
    } catch (error) {
      return error
    }
  },
  async createItem (payload) {
    try {
      let docRef = await itemsCollection.add(payload)
      return docRef
    } catch (error) {
      return error
    }
  },
  async deleteItem (itemId) {
    try {
      let docRef = await itemsCollection.doc(itemId).delete()
      return docRef
    } catch (error) {
      return error
    }
  }
}
