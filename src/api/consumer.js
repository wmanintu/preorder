import { db } from '../firebase'

export default {
  async addConsumer (data) {
    // params: (userId, itemId)
    try {
      let docRef = await db.collection('consumers').add(data)
      return docRef
    } catch (error) {
      return error
    }
  }
}