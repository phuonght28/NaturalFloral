import EventEmitter from './event-emitter'
import { AsyncStorage, Platform, PermissionsAndroid, Alert } from 'react-native'
import PRODUITS from './parsers/produits'
import PLANTES from './parsers/plantes'
import IMAGES from './images'
import moment from 'moment'
import { Permissions, Notifications } from 'expo'
import { Auth } from './Firebase/Auth'
const messageRequest = {
  'title': 'App request camera permission',
  'message': ' App needs access to your camera ' + 'so you can take awesome pictures.'
}
class Storage extends EventEmitter {
  constructor() {
    super()
    this.newDate = moment(new Date()).format('h:mm:ss:SS')
  }
  async warmUp() {
    await this._retrieveData('FAVORITE')
    await Auth.getInstance().checkConnection('Storage/warmUp')
  }


  _retrieveData = async (keyString) => {
    try {
      const value = await AsyncStorage.getItem(keyString);
      if (value !== null) {
        // We have data!!
        //console.log("AsyncStorage.getItem(", keyString, "): value ==", value)
      }
      else {
        //console.log("AsyncStorage.getItem(", keyString, "): value ==", value)
        this._storeData(keyString, [])
      }
    }
    catch (error) {
      //console.log("AsyncStorage.getItem(", keyString, "): error ==", error)
      // Error retrieving data
    }
  }

  _storeData = async (keyString, data) => {
    try {
      await AsyncStorage.setItem(keyString, JSON.stringify(data)).then((error) => {
        //console.log("AsyncStorage.setItem(", keyString, "): error ==", error)
        //this._retrieveData(keyString)
      })
    } catch (error) {
      // Error saving data
    }
  }
  askAsyncPermissionsNOTIFICATIONS = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = status
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
    if (finalStatus !== 'granted') return
  }

  /** 
   *   
   * const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      messageRequest
    )
    if(granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera")
      resolve(result)
    } else {
      console.log("Camera permission denied")
      reject(error)
    } 
  */

  /**
   Camera permission denied Object {
     "android.permission.CAMERA": "granted",
    "android.permission.READ_EXTERNAL_STORAGE": "granted",
    "android.permission.WRITE_EXTERNAL_STORAGE": "granted",
  }
  */

  getAsyncPermissions = async (PermissionType) => {
    return new Promise(async (resolve, reject) => {
      await Permissions.getAsync(PermissionType)
        .then(async (resultGet) => {
          resultGet.status === 'granted' ?
            resolve(resultGet) :
            await Permissions.askAsync(PermissionType).then((resultAsk) => {
              resultAsk.status === 'granted' ? resolve(resultAsk) : reject(resultAsk)
            })
        })
        .catch(error => { reject(error) })
    })
  }

  _registerForPushNotifications = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = status
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      return
    }
    let token = await Notifications.getExpoPushTokenAsync();
    console.log('Discussion/registerForPushNotifications:', token)
    // await this.Authentication
    //   .updateUserProfile(userFirebase, { expoPushTokenAsync: token })
    //   .catch((error) => {
    //     console.log('Discussion/registerForPushNotifications/updateUserProfile error:', error)
    //   })
    //   .then(() => {
    //     console.log('Discussion/registerForPushNotifications/updateUserProfile successfully:')
    //     this._pushNotification(userFirebase, token)
    //   })
  }


  _pushNotification = (tokenArray) => {
    return new Promise((resolve, reject) => {
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokenArray)
      })
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })

  }
  _storageReceived = (keyString) => {
    try {
      AsyncStorage.getItem(keyString, (err, result) => {
        if (result) {
          if (result == '') {
            console.log(this.newDate, keyString, 'Storage result == "" !!!')
          }
          else {
            console.log(this.newDate, keyString, 'Storage result ', result)
          }
          return JSON.parse(result)
        }
        else {
          const value = []
          console.log(this.newDate, keyString, ' error ')
          this._storageUpdate(keyString, value)
        }
      })
    }
    catch (error) {
      // Error retrieving data
    }
  }

  _storageUpdate = (keyString, valueString) => {
    try {
      AsyncStorage.setItem(keyString, JSON.stringify(valueString), () => {
        this._storageReceived(keyString)
      })
    }
    catch (error) {
      // Error retrieving data
    }
  }
  _storageReset = async (keyString) => {
    try {
      AsyncStorage.removeItem(keyString, (err) => {
        if (err) {
          console.log('AsyncStorage.removeItem err:', err)
        }
      })
    }
    catch (error) {
      // Error retrieving data
    }
  }

  getPlantesList(FAVORI) {
    //console.log(this.newDate, 'getPlantesList(FAVORI):', FAVORI)
    const plantesList = []
    PLANTES.map((item) => {
      const plante = {}
      plante.id = item.id
      plante.nom = item.nom
      plante.nom_common = item.nom
      plante.nom_latin = item.nom_latin
      plante.img = IMAGES.getPlantesImages(item.id)
      plante.favori = false
      if (FAVORI && FAVORI !== "") {
        plante.favori = FAVORI.find((id) => item.id === id) ? true : false
      }
      plantesList.push(plante)
    })
    return plantesList
  }
  async getPlanteDetail(propsID, FAVORI) {
    let plante
    PLANTES.map((item) => {
      if (item.id == propsID) {
        plante = item
        plante.img = IMAGES.getPlantesImages(item.id)
        plante.favori = false
        if (FAVORI && FAVORI !== "") {
          plante.favori = FAVORI.find((id) => item.id === id) ? true : false
        }
        // if (FAVORI !== '') {
        //   plante.favori = FAVORI.find((id) => item.id === id) ? true : false
        // }
      }
    })
    return plante
  }
}

export default new Storage()
