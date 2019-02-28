import { db } from '../firebase'

export default {
  async getItems (menuId) {
    try {
      let querySnapshot = await db.collection('items').where('menu_id', '==', menuId).get()
      return querySnapshot
    } catch (error) {
      return error
    }
  }
}
