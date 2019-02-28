import { db } from '../firebase'

export default {
  async getMenus () {
    try {
      let querySnapshots = await db.collection('menus').get()
      return querySnapshots
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
  }
}