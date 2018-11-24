const { RESTDataSource } = require('apollo-datasource-rest')

class ScheduleAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://statsapi.web.nhl.com/api/v1/schedule'
  }

  async returnSchedule( startDate, endDate ) {
    const fullSchedule = await this.get(`/?startDate=${startDate}&endDate=${endDate}`)
    return fullSchedule.dates.map((date) => {
      return date
    })
  }

  async returnGames( date ) {
    const dayGames = await this.get(`/?date=${date}`)
    const games = dayGames.dates[0].games.map( game => {
      game.awayTeamId = game.teams.away.team.id
      game.awayTeamScore = game.teams.away.score
      game.homeTeamId = game.teams.home.team.id
      game.homeTeamScore = game.teams.home.score
      return game
    })
    return games
  }
}

module.exports = ScheduleAPI
