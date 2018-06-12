import moment from 'moment'

const TEAM_IMG_URL = 'http://esportsace.com/static/images/csgo/teams/'

class CSGOParser {
  parseSeriesList(data, group, game) {
    const seriesList = []
    let currentDate = ''
    data[group].map((series, index) => {
      const leftTeam = data.teams.find(({ team_id }) => team_id === series.radiant_team)
      const rightTeam = data.teams.find(({ team_id }) => team_id === series.dire_team)
      const league = data.leagues.find(({ league_id }) => league_id === series.league_id)
      const newDate = moment(series.created_date).format('MMMM DD')

      if (newDate != currentDate) {
        currentDate = newDate
        seriesList.push({
          id: index,
          name: newDate,
          header: true
        })
      }

      const isWaiting = series.status === 'waiting'

      const s = {
        id: series.series_id,
        series,
        league,
        group,
        game,
        left: {
          name: leftTeam.name,
          tag: leftTeam.tag,
          score: isWaiting ? '-' : series.radiant_score,
          logo: `${TEAM_IMG_URL}/${leftTeam.team_id}.png`
        },
        right: {
          name: rightTeam.name,
          tag: rightTeam.tag,
          score: isWaiting ? '-' : series.dire_score,
          logo: `${TEAM_IMG_URL}/${rightTeam.team_id}.png`
        }
      }
      seriesList.push(s)

      if ((index % 5) === 4) {
        seriesList.push({
          isAds: true,
          id: index + 100000 // Avoid duplicated key
        })
      }
    })
    return seriesList
  }

  parseSeries(data) {
    return data
  }
}

export default new CSGOParser()
