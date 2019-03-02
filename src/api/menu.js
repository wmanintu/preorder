import { menusCollection } from '../config/firebase'

export default {
  async getMenus () {
    try {
      let querySnapshots = await menusCollection.get()
      return querySnapshots
    } catch (error) {
      return error
    }
  },
  async createMenu (data) {
    try {
      let docRef = await menusCollection.add(data)
      return docRef
    } catch (error) {
      return error
    }
  },
  async getMenu (menuId) {
    try {
      let querySnapshot = await menusCollection.doc(menuId).get()
      return querySnapshot
    } catch (error) {
      return error
    }
  }
}