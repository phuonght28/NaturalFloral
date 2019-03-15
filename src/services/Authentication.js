import SendBird from 'sendbird'
import LANGUAGE from '../constants/LanguageFrench'
import { HandleErrors } from './config'
import { Notifications } from 'expo'
import { SendBirdAction } from './SendBirdAction'
import { SendBirdConnection } from './SendBird/SendBirdConnection'
import { SendBirdChatEvent } from './SendBird/SendBirdChatEvent'

import { Firestore } from './Firebase/Firestore'

const firebase = require('firebase')

let instance = null
export class Authentication {
  static getInstance() {
    return new Authentication()
  }
  constructor() {
    if (instance) { return instance }
    instance = this
    this.Firestore = Firestore.getInstance()
    this.Sendbird = SendBirdAction.getInstance()
  }
  updateProfile = (docData) => {
    const user = firebase.auth().currentUser
    return new Promise((resolve, reject) => {
      this.Firestore.updateUserProfile(user, docData)
        .catch(error => {
          console.log("this.Firestore.updateUserProfile error:", error)
          const errorMessage = HandleErrors(error)
          reject(error)
        })
        .then((response2) => {
          resolve(response2)
        })
    })
  }
  updateProfilePhoto = (photoURL) => {
    const dataUpdate = { photoURL: photoURL }
    const user = firebase.auth().currentUser
    return new Promise((resolve, reject) => {
      user.updateProfile(dataUpdate)
        .catch(error => {
          const errorMessage = HandleErrors(error.code)
          reject(errorMessage)
        })
        .then(() => {
          this.Firestore.updateUserProfile(user, dataUpdate)
            .catch(error => {
              const errorMessage = HandleErrors(error)
              reject(errorMessage)
            })
            .then(() => {
              this.Sendbird.updateCurrentUserInfo(nickname = null, photoURL)
                .catch(error => {
                  const errorMessage = HandleErrors(error)
                  reject(errorMessage)
                })
                .then((response) => {
                  console.log('this.Sendbird.updateCurrentUserInfo', response)
                  resolve(response)
                })
            })
        })
    })
  }

  updateUserName = (docData) => {
    const user = firebase.auth().currentUser
    console.log(user.uid)
    //const docRef = this.Firestore.collection("users").doc(user.uid)
    return new Promise((resolve, reject) => {
      user.updateProfile({
        displayName: docData.displayName,
      })
        .catch(error => {
          console.log("user.updateProfile.displayName error:", error)
          const errorMessage = HandleErrors(error)
          reject(error)
        })
        .then(() => {
          console.log("user.updateProfile.displayName done")
          this.Firestore.updateUserProfile(user, docData)
            .catch(error => {
              console.log("this.Firestore.updateUserProfile error:", error)
              const errorMessage = HandleErrors(error)
              reject(errorMessage)
            })
            .then((response2) => {
              this.Sendbird.updateCurrentUserInfo(docData.displayName, photoURL = null)
                .catch(error => {
                  console.log("this.Firestore.updateUserProfile error:", error)
                  const errorMessage = HandleErrors(error)
                  reject(errorMessage)
                })
                .then((response3) => {
                  console.log('this.Sendbird.updateCurrentUserInfo', response3)
                  resolve(response3)
                })
            })
        })
    })
  }
  updateEmailTel = (docData) => {
    console.log(docData)
    const user = firebase.auth().currentUser
    return new Promise((resolve, reject) => {
      user.updateEmail(docData.email)
        .catch(error => {
          //console.log("updateEmail error:", error.code)
          const errorMessage = HandleErrors(error)
          reject(error)
        })
        .then(() => {
          console.log("user.updateEmail result" )
          this.Firestore.updateUserProfile(user, docData)
            .catch(error => {
              console.log("this.Firestore.updateUserProfile error:", error)
              const errorMessage = HandleErrors(error)
              reject(error)
            })
            .then((response2) => {
              resolve(response2)
            })
        })
    })
  }
  updateEmail = (email) => {
    const dataUpdate = { email: email }
    const user = firebase.auth().currentUser
    return new Promise((resolve, reject) => {
      user.updateEmail(email)
        .catch(error => {
          const errorMessage = HandleErrors(error.code)
          reject(errorMessage)
        })
        .then(() => {
          this.Firestore.updateUserProfile(user, dataUpdate)
            .catch(error => {
              const errorMessage = HandleErrors(error)
              reject(errorMessage)
            })
            .then(() => {
              resolve(true)
            })

        })
    })
  }

}