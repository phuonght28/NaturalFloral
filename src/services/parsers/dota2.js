import moment from 'moment'
import ImageStorage from '../images'

class Dota2Parser {
  parseSeriesList(data, group, meta) {
    const seriesList = []
    let currentDate = ''
    if (!data || !data[group]) {
      return []
    }

    data[group].map((series, index) => {
      const newDate = moment.unix(series.start_time).format('MMMM DD')

      if (newDate != currentDate) {
        currentDate = newDate
        seriesList.push({
          id: `header-${series.series_id}`,
          name: newDate,
          header: true
        })
      }

      const s = this._mapSeries(data.teams, data.leagues, series, meta)

      seriesList.push(s)

      if ((index % 5) === 0) {
        seriesList.push({
          isAds: true,
          id: `ads-${series.series_id}`
        })
      }
    })

    return seriesList
  }

  parseSeries(data, meta) {
    if (data.radiant_stat && data.dire_stat) {
      const teams = data.radiant_stat.teams.concat(data.dire_stat.teams)
      const leagues = data.radiant_stat.leagues.concat(data.dire_stat.leagues)
      if (data.radiant_stat && data.radiant_stat.recent_series) {
        data.leftRecent = data.radiant_stat.recent_series.map((series) =>
          this._mapSeries(teams, leagues, series, meta))
      }
      if (data.dire_stat && data.dire_stat.recent_series) {
        data.rightRecent = data.dire_stat.recent_series.map((series) =>
          this._mapSeries(teams, leagues, series, meta))
      }
    }


    if (data.head_to_head && data.head_to_head.recent_series) {
      const teams = data.head_to_head.teams
      const leagues = data.head_to_head.leagues
      data.headToHeadRecent = data.head_to_head.recent_series.map((series) =>
        this._mapSeries(teams, leagues, series, meta))
    }

    const series = this._mapSeries(data.teams, data.leagues, data, meta)

    return { ...data, ...series }
  }

  parseTeam(data) {
    return data
  }

  _mapSeries(teams, leagues, series, meta) {
    const leftTeam = teams.find(({ team_id }) => team_id === series.radiant_team) || teams[0]

    const rightTeam = teams.find(({ team_id }) => team_id === series.dire_team) || teams[1]
    const league = leagues.find(({ league_id }) => league_id === series.league_id) || leagues[0]

    const isWaiting = series.status === 'waiting'

    return {
      id: series.series_id,
      meta,
      series,
      league,
      left: {
        id: leftTeam.team_id,
        name: leftTeam.name,
        tag: leftTeam.tag,
        score: isWaiting ? '-' : series.radiant_score,
        logo: ImageStorage.getTeamImage(leftTeam.team_id)
      },
      right: {
        id: rightTeam.team_id,
        name: rightTeam.name,
        tag: rightTeam.tag,
        score: isWaiting ? '-' : series.dire_score,
        logo: ImageStorage.getTeamImage(rightTeam.team_id)
      }
    }
  }
}

export default new Dota2Parser()
