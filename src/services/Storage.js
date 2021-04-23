import EventEmitter from './event-emitter'
import { AsyncStorage } from 'react-native'
import PRODUITS from '../parsers/produits'
import PLANTES from '../parsers/plantes'
import IMAGES from './images'
import moment from 'moment'

class Storage extends EventEmitter {
  constructor() {
    super()
    this.newDate = moment(new Date()).format('h:mm:ss:SS')
  }
  async warmUp() {
    // await this._retrieveData('FAVORITE')
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
  _storageReceived = (keyString) => {
    try {
      AsyncStorage.getItem(keyString, (err, result) => {
        if (result) {
          if (result == '') {
            //console.log(this.newDate, keyString, 'Storage result == "" !!!')
          }
          else {
            //console.log(this.newDate, keyString, 'Storage result ', result)
          }
          return JSON.parse(result)
        }
        else {
          const value = []
          //console.log(this.newDate, keyString, ' error ')
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
          //console.log('AsyncStorage.removeItem err:', err)
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
