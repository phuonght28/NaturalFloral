const firebase = require('firebase')
require('firebase/firestore')

let instance = null

class Firebase {
  constructor() {
    if (instance) {
      return instance
    }
    this.db = firebase.firestore()
    this.db.settings({ timestampsInSnapshots: true })
    instance = this
  }
  
  createFirebaseAccount = (name, email, password, isNaturopath) => {
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
            }).then(() => {
              const user = info.user
              const docData = {
                uid: user.uid,
                email: user.email,
                username: name,
                displayName: name,
                firstname: null,
                lastname: null,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                postalcode: null,
                birthday: null,
                conditions: true,
                showUsername: true,
                isNaturopath: isNaturopath,
              }
              this.setUserProfile(user, docData)
            })
            resolve(true)
          }
        })
    })
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
            //const user = currentUser.user
            //this.getUserProfile(user)
            resolve(currentUser.user)
          }
        })
    })
  }
  /* * Retrieve the entire collection  */
  getUserList() {
    const docRef = this.db.collection("users")
    return new Promise((resolve, reject) => {
      docRef.get()
        .then((querySnapshot) => {
          const listUsers = []
          querySnapshot.forEach((doc) => {
            let userData = doc.data()
            userData.uid = doc.id
            listUsers.push(userData)
          })
          resolve(listUsers)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
  getUserProfile = (user) => {
    const docRef = this.db.collection("users").doc(user.uid)
    return new Promise((resolve, reject) => {
      docRef.get()
        .then((doc) => {
          if (doc.exists) {
            //console.log('getUserProfile doc.data()', doc.data())
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
    const docRef = this.db.collection("users").doc(user.uid)
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
    const docRef = this.db.collection("users").doc(user.uid)
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
    return new Firebase()
  }
}

export { Firebase }
//export default new Firebase()
