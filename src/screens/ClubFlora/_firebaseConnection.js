const firebase = require('firebase')
require('firebase/firestore')

let instance = null

class FirebaseConnection {
  constructor() {
    if (instance) {
      return instance
    }
    this.db = firebase.firestore()
    this.db.settings({ timestampsInSnapshots: true })
    instance = this
  }

  userLogin = (email, password) => {
    let errorCode = ''
    return new Promise(resolve => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              errorCode = 'Invalid email address format.'
              console.warn('Invalid email address format.')
              break
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              errorCode = 'Invalid email address or password.'
              console.warn('Invalid email address or password')
              break
            default:
              errorCode = 'Check your internet connection.'
              console.warn('Check your internet connection')
          }
          resolve(errorCode)
        })
        .then(currentUser => {
          if (currentUser) {
            const user = currentUser.user
            const docData = {
              uid: user.uid,
              email: user.email,
              firstname: null,
              lastname: null,
              username: user.displayName,
              displayName: user.displayName,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              postalcode: null,
              birthday: null,
              conditions: true,
              showUsername: true,
              isNaturopath: true,
            }
            const docRef = this.db.collection("users").doc(user.uid)
            docRef.get()
              .catch(function (error) {
                reject(error)
              })
              .then((doc) => {
                if (doc.exists) {
                  //resolve(doc.data())
                  console.log(doc.data())
                }
                else {
                  this.userAddProfile(user, docData)
                  //console.log('No such document!')
                  //resolve("No such document!")
                }
              })
            resolve(currentUser)
          }
        })
    })
  }

  userAddProfile = (user, docData) => {
    const docRef = this.db.collection("users").doc(user.uid)
    return new Promise((resolve, reject) => {
      docRef.set(docData)
        .then((data) => {
          console.log("Document successfully written : ", data)
        })
        .catch((error) => {
          console.error("Error writing document: ", error)
        })
    })
  }
  createFirebaseAccount = (name, email, password) => {
    return new Promise(resolve => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(error => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              console.warn('This email address is already taken')
              break
            case 'auth/invalid-email':
              console.warn('Invalid e-mail address format')
              break
            case 'auth/weak-password':
              console.warn('Password is too weak')
              break
            default:
              console.warn('Check your internet connection')
          }
          resolve(false)
        })
        .then(info => {
          if (info) {
            firebase.auth().currentUser.updateProfile({
              displayName: name
            })
            resolve(true)
          }
        })
    })
  }

  sendEmailWithPassword = (email) => {
    return new Promise(resolve => {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          console.warn('Email with new password has been sent')
          resolve(true)
        }).catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              console.warn('Invalid email address format')
              break
            case 'auth/user-not-found':
              console.warn('User with this email does not exist')
              break
            default:
              console.warn('Check your internet connection')
          }
          resolve(false)
        })
    })
  }


  static getInstance() {
    return new FirebaseConnection()
  }
}

export { FirebaseConnection }
