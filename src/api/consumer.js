import { consumersCollection } from '../config/firebase'

export default {
  async addConsumer (data) {
    try {
      let docRef = await consumersCollection.add(data)
      return docRef
    } catch (error) {
      return error
    }
  }
}