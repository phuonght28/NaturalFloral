const firebase = require('firebase')
require('firebase/firestore')

let firestore, instance = null
class Firestore {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
    firestore = firebase.firestore()
    firestore.settings({ timestampsInSnapshots: true })
  }


  getUserList() {
    const docRef = firestore.collection("users")
    return new Promise((resolve, reject) => {
      docRef.get()
        .then((querySnapshot) => {
          const listUsers = []
          querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`)
            // let userData = doc.data()
            // userData.uid = doc.id
            listUsers.push(doc.data())
          })
          resolve(listUsers)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
  getUserProfileById = (uid) => {
    const docRef = firestore.collection("users").doc(uid)
    return new Promise((resolve, reject) => {
      docRef.get()
        .then((doc) => {
          doc.exists ? resolve(doc.data()) : reject(error)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  getUserProfile = (user) => {
    const docRef = firestore.collection("users").doc(user.uid)
    return new Promise((resolve, reject) => {
      docRef.get()
        .then((doc) => {
          if (doc.exists) {
            resolve(doc.data())
          }
          else {
            const docData = {
              uid: user.uid,
              email: user.email,
              username: user.displayName,
              displayName: user.displayName,
              firstname: null,
              lastname: null,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              postalcode: null,
              birthday: null,
              conditions: true,
              showUsername: true,
              isNaturopath: true,
              expoPushTokenAsync: null
            }
            this.setUserProfile(user, docData)
          }
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
  setUserProfile = (user, docData) => {
    const docRef = firestore.collection("users").doc(user.uid)
    return new Promise((resolve, reject) => {
      docRef.set(docData)
        .then(() => {
          console.log("Document successfully written : ")
        })
        .catch((error) => {
          console.error("Error writing document: ", error)
        })
    })
  }
  updateUserProfile = (user, docData) => {
    const docRef = firestore.collection("users").doc(user.uid)
    return new Promise((resolve, reject) => {
      docRef.update(docData)
        .then(() => {
          console.log("updateUserProfile successfully")
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }


  static getInstance() {
    return new Firestore()
  }
}

export { Firestore }
