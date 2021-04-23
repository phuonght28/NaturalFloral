import moment from 'moment'
import { FileSystem } from 'expo'

class CachedAPI {
  constructor() {
    this._memDb = {}
  }

  async init() {
    try {
      this._memDb = JSON.parse(
        await FileSystem.readAsStringAsync(FileSystem.cacheDirectory + 'cache.json')
      )
    }
    catch (err) {
      //console.log(err)
    }
  }

  async retrieve(url, cache) {
    const startTime = new Date()
    const cachedData = this._memDb[url]

    let data
    if (!cache) {
      data = await this._fetch(url)
    }
    else {
      if (cachedData) {
        const time = cachedData.time
        if (moment().diff(time, 'minutes') <= cache) {
          //console.log(`Cached time: ${new Date() - startTime}`)
          return cachedData.data
        }
      }

      data = await this._fetch(url)

      this._memDb[url] = {
        time: new moment(), // eslint-disable-line new-cap
        data
      }
    }

    await this.syncData()
    //console.log(`API Fetch time: ${new Date() - startTime}`)
    return data
  }

  async _fetch(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

  async syncData() {
    await FileSystem.writeAsStringAsync(FileSystem.cacheDirectory + 'cache.json', JSON.stringify(this._memDb))
  }

  async clearCache() {
    this._memDb = {}
    await this.syncData()
  }
}

export default new CachedAPI()
