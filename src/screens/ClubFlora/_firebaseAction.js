const firebase = require('firebase')
require('firebase/firestore')

const isNull = value => {
  try {
    return value === null
  } catch (e) {
    return false
  }
}

let instance = null

class FirebaseAction {
  constructor() {
    if (instance) {
      return instance
    }
    this.db = firebase.firestore()
    this.db.settings({ timestampsInSnapshots: true })


    this.userQuery = null
    this.openChannelQuery = null
    this.groupChannelQuery = null
    this.previousMessageQuery = null
    this.participantQuery = null
    this.blockedQuery = null
    instance = this
  }

  /* *  Add a new document in collection "cities"  */
  setCollection() {
    return new Promise((resolve, reject) => {

      db.collection("users").doc("LA")
        .set({
          name: "Los Angeles",
          state: "CA",
          country: "USA"
        })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });

    })
  }


  /* * Retrieve the entire collection  */
  getCollection() {
    return new Promise((resolve, reject) => {
      this.db.collection("users").get().then((querySnapshot) => {
        const listUsers = []
        querySnapshot.forEach((doc) => {
          let userData = doc.data()
          userData.uid = doc.id
          console.log(doc.id, " => ", doc.data())


          listUsers.push(userData)
        })
        resolve(listUsers)
      }).catch(function (error) {
        reject(error)
      })
    })
  }

  getUserData(uid) {
    var docRef = this.db.collection("users").doc(uid)
    return new Promise((resolve, reject) => {
      docRef.get().then(function (doc) {
        if (doc.exists) {
          resolve(doc.data())
        } else {
          resolve("No such document!")
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  }

  static getInstance() {
    return new FirebaseAction()
  }
}

export { FirebaseAction }
