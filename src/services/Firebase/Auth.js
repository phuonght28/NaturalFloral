import SendBird from 'sendbird'
import LANGUAGE from '../../constants/LanguageFrench'
import { Firebase_API, SendBird_API, uuid4, isEmpty, errorAlert, StoreGlobal } from '../config'
import { Notifications } from 'expo'
import { SendBirdAction } from '../SendBirdAction'
import { SendBirdConnection } from '../SendBird/SendBirdConnection'
import { SendBirdChatEvent } from '../SendBird/SendBirdChatEvent'
const firebase = require('firebase')
require('firebase/firestore')

//import { Firestore } from './Firestore'
//import { Storage } from './Storage'
let instance = null
let firestore
export class Auth {
  static getInstance() {
    return new Auth()
  }
  constructor() {
    if (instance) {
      return instance
    }
    firestore = firebase.firestore()
    firestore.settings({ timestampsInSnapshots: true })
    this.sendbirdAction = SendBirdAction.getInstance()
    instance = this
    this.isSinged = false
    this.userSendbird = null
    this.userFirebase = null
  }
  checkConnection = () => {
    return new Promise(async (resolve) => {
      await firebase.auth().onAuthStateChanged((userFirebase) => {
        if (userFirebase) {
          this.sendbirdAction.connect(userFirebase.uid, userFirebase.displayName).then(userSendbird => {
            if (userSendbird) {
              this.isSinged = true
              this.userFirebase = userFirebase
              this.userSendbird = userSendbird
              resolve(true)
              this._addEventListener()
              this.checkExpoPushTokenAsync(userFirebase)
            }
            else {
              this.disconnect()
              resolve(false)
            }
          })
        }
        else {
          this.disconnect()
          resolve(false)
        }
      })
    })
  }
  setCURRENT_USER = (isSinged, userFirebase) => {
    this.sendbirdAction.connect(userFirebase.uid, userFirebase.displayName).then(userSendbird => {
      if (userSendbird) {
        this.isSinged = isSinged
        this.userFirebase = userFirebase
        this.userSendbird = userSendbird
        this._addEventListener()
        this.checkExpoPushTokenAsync(userFirebase)
      }
      else {
        this.disconnect()
      }
    })
  }
  _addEventListener = () => {
    SendBirdConnection.getInstance()
    //SendBirdChatEvent.getInstance()
  }
  _removeEventListener = () => {
    SendBirdConnection.getInstance().remove()
    SendBirdChatEvent.getInstance().remove()
  }
  _isSinged = () => {
    return this.isSinged
  }
  CURRENT_USER = () => {
    const userFirebase = this.userFirebase
    const userSendbird = this.userSendbird
    const currentUser = { userFirebase, userSendbird }
    return currentUser
  }
  checkExpoPushTokenAsync = (userFirebase) => {
    return new Promise(async () => {
      let token = await Notifications.getExpoPushTokenAsync()
      this.updateUserProfile(userFirebase, { expoPushTokenAsync: token })
        .catch((error) => {
          console.log('checkExpoPushTokenAsync updateUserProfile error:', error)
        })
        .then(() => {
          console.log('checkExpoPushTokenAsync updateUserProfile success:')
        })

    })


  }
  disconnect = () => {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        this.sendbirdAction.disconnect()
          .then(() => {
            this.isSinged = false
            this.userSendbird = null
            this.userFirebase = null
            //this._removeEventListener()
            resolve(true)
          })
          .catch(error => {
            reject(error)
          })
      })
    })
  }
  createFirebaseAccount = (name, email, password, isNaturopath) => {
    let errorCode = ''
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(error => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              errorCode = LANGUAGE.Email_Already_In_Use
              break
            case 'auth/invalid-email':
              errorCode = LANGUAGE.Invalid_Email
              break
            case 'auth/weak-password':
              errorCode = LANGUAGE.Weak_Password
              break
            default:
              errorCode = LANGUAGE.Check_Internet_Connection
          }
          this.disconnect()
          reject(errorCode)
        })
        .then(currentUser => {
          if (currentUser) {
            const userFirebase = currentUser.user
            userFirebase.displayName = name
            firebase.auth().currentUser.updateProfile({ displayName: name })
              .then(() => {

                const docData = {
                  uid: userFirebase.uid,
                  email: userFirebase.email,
                  username: name,
                  displayName: name,
                  firstname: null,
                  lastname: null,
                  phoneNumber: userFirebase.phoneNumber,
                  photoURL: userFirebase.photoURL,
                  postalcode: null,
                  birthday: null,
                  conditions: true,
                  showUsername: true,
                  isNaturopath: isNaturopath,
                  expoPushTokenAsync: null
                }
                this.setUserProfile(userFirebase, docData)

              })

            this.setCURRENT_USER(isSinged = true, userFirebase)
            resolve(userFirebase)
          }
        })
    })
  }
  userLogin = (email, password) => {
    let errorCode = LANGUAGE.Check_Internet_Connection
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              errorCode = LANGUAGE.Invalid_Email
              break
            case 'auth/user-not-found':
              errorCode = LANGUAGE.User_Not_Found
              break
            case 'auth/wrong-password':
              errorCode = LANGUAGE.Wrong_Password
              break
            default:
              errorCode = LANGUAGE.Check_Internet_Connection
          }
          this.disconnect()
          reject(errorCode)
        })
        .then(currentUser => {
          if (currentUser) {
            const userFirebase = currentUser.user
            this.setCURRENT_USER(isSinged = true, userFirebase)
            this.getUserProfile(userFirebase)
            resolve(userFirebase)
          }
        })
    })
  }

  /* * Retrieve the entire collection  */
  getCurrentUser() {
    // console.log('firebase.auth().currentUser', firebase.auth().currentUser)
    return firebase.auth().currentUser
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
    if (isEmpty(user)) {
      user = this.getCurrentUser()
      console.log("this.getCurrentUser(): ", user)
    }
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
          console.log(`Auth.updateUserProfile ${user.uid} successfully `)

          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  sendEmailWithPassword = (email) => {
    let errorCode = ''
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          console.warn('Email with new password has been sent')
          resolve(true)
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              errorCode = LANGUAGE.Invalid_Email
              break
            case 'auth/user-not-found':
              errorCode = LANGUAGE.User_Not_Found
              break
            default:
              errorCode = LANGUAGE.Check_Internet_Connection
          }
          reject(errorCode)
        })
    })
  }
}