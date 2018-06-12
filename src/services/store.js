import EventEmitter from './event-emitter'
import Navigator from './navigator'
import cachedAPI from './cached-api'
import Dota2Parser from './parsers/dota2'
// import CSGOParser from './parsers/csgo'

const PAGE_SIZE = 5
const SERIES_GROUP = [
  {
    title: 'Upcoming', id: 'upcoming', dataKey: 'upcoming_series', cache: 1
  },
  {
    title: 'Live Score', id: 'live', dataKey: 'live_series', cache: 1
  },
  {
    title: 'Matches History', id: 'history', dataKey: 'ended_series', cache: 5
  }
]

const HOST = 'https://esportsace.com'

class Store extends EventEmitter {
  constructor() {
    super()
    this._games = [
      {
        name: 'Dota 2',
        seriesTypes: SERIES_GROUP.map((group) => ({
          ...group,
          parser: Dota2Parser,
          baseUrl: `${HOST}/api/v1/dota2/`
        }))
      },
      {
        name: 'CSGO',
        seriesTypes: SERIES_GROUP.map((group) => ({
          ...group,
          parser: Dota2Parser, // TODO: API is not ready
          baseUrl: `${HOST}/api/v1/dota2/` // TODO: API is not ready
        }))
      }
    ]
  }

  async warmUp() {
    await cachedAPI.init()
    await this.getSeries({
      ...SERIES_GROUP[0],
      parser: Dota2Parser,
      baseUrl: `${HOST}/api/v1/dota2/`
    })
    await this.getSeries({
      ...SERIES_GROUP[1],
      parser: Dota2Parser,
      baseUrl: `${HOST}/api/v1/dota2/`
    })
    await this.getSeries({
      ...SERIES_GROUP[2],
      parser: Dota2Parser,
      baseUrl: `${HOST}/api/v1/dota2/`
    })
  }

  async getSeries(meta, page = 1) {
    try {
      const {
        baseUrl, id, dataKey, parser, cache
      } = meta
      const url = `${baseUrl}series/${id}?page=${page}&&size=${PAGE_SIZE}`
      const data = await cachedAPI.retrieve(url, cache)
      const seriesList = parser.parseSeriesList(data, dataKey, meta)

      return { data: seriesList, lastItem: seriesList.length < PAGE_SIZE }
    }
    catch (err) {
      if (err.message === 'Network request failed') {
        Navigator.showNetworkError()
      }
      else {
        console.log(err) // eslint-disable-line no-console
      }
      return { data: [] }
    }
  }

  async getSeriesDetail({ meta, id }) {
    console.log(`Series: ${id}`) // eslint-disable-line no-console
    try {
      const {
        baseUrl, parser
      } = meta
      const url = `${baseUrl}series/${id}`
      const data = await cachedAPI.retrieve(url, meta.id === 'history' ? 999999999999 : 0)

      const parsedData = parser.parseSeries(data, meta)

      return parsedData
    }
    catch (err) {
      if (err.message === 'Network request failed') {
        Navigator.showNetworkError()
      }
      else {
        console.log(err) // eslint-disable-line no-console
      }
      return {}
    }
  }

  async getMatch(matchId, cache = 0) {
    console.log(`Match: ${matchId}`) // eslint-disable-line no-console
    try {
      const url = `https://esportsace.com/api/v1/dota2/match/${matchId}`
      const data = await cachedAPI.retrieve(url, cache)
      return data
    }
    catch (err) {
      if (err.message === 'Network request failed') {
        Navigator.showNetworkError()
      }
      else {
        console.log(err) // eslint-disable-line no-console
      }
      return {}
    }
  }

  async getTeamStat({ id }) {
    try {
      const url = `https://esportsace.com/api/v1/dota2/team/${id}/stat`
      const data = await cachedAPI.retrieve(url)
      return data
    }
    catch (err) {
      if (err.message === 'Network request failed') {
        Navigator.showNetworkError()
      }
      else {
        console.log(err) // eslint-disable-line no-console
      }
      return {}
    }
  }

  get games() {
    return this._games
  }
}

export default new Store()
