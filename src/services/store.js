import EventEmitter from './event-emitter'
import { AsyncStorage } from 'react-native'
import PRODUITS from './parsers/produits'
import PLANTES from './parsers/plantes'
import IMAGES from './images'

class Store extends EventEmitter {
  constructor() {
    super()
  }

  async warmUp() {
    //await this._storeData('FAVORITE', JSON.stringify(['fdsf']))
  }
  _retrieveData = async (keyString) => {
    try {
      const value = await AsyncStorage.getItem(keyString)
      if (value !== null) {
        value = JSON.parse(value)
        return value
      }
      else {
        this._storeData(keyString, '')
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  _storeData = async (keyString, valueString) => {
    try {
      valueString = JSON.stringify(valueString)
      AsyncStorage.setItem(keyString, valueString)
    } catch (error) {
      // Error saving data
    }
  }
  _clearData = async (key) => {
    try {
      AsyncStorage.removeItem(key, (err) => {
        console.log('err:', err)
      })
    } catch (error) {
      // Error saving data
    }
  }

  async getPlantesList() {
    const FAVORITE = await this._retrieveData('FAVORITE')
    
    const plantesList = []
    PLANTES.map((plante) => {
      let item = []
      item.id = plante.id
      item.nom = plante.nom
      item.nom_common = plante.nom
      item.nom_latin = plante.nom_latin
      item.img = IMAGES.getPlantesImages(plante.id)
      item.favori = false
      //item.favori = FAVORITE.find((id) => plante.id === id) ? true : false
      plantesList.push(item)
    })
    return plantesList
  }
  async getPlanteDetail(propsID) {
    const FAVORITE = await this._retrieveData('FAVORITE')

    const plant = PLANTES.find((item) => item.id === propsID)
    item.favori = false
    // plant.favori = FAVORITE.find((id) => id === propsID) ? true : false
    plant.img = IMAGES.getPlantesImages(propsID)
    return plant
  }
}

export default new Store()
