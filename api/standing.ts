import axios from 'axios'

export function getTournamentID(leagueID: string) {
  const start = new Date(0).toISOString()
  const end = new Date().toISOString()
  const options = {
    method: 'GET',
    url: 'https://api.pandascore.co/leagues/' + leagueID + '/tournaments',
    params: {
      'filter[has_bracket]': 'false',
      'range[begin_at]' : start + ", " + end,
      page: '1', // delete page options
      per_page: '1'
    },
    headers: {
      accept: 'application/json',
      authorization: "Bearer 3c_9nXv0AMBnWO81RbPJvz_GlEc4KvEO8W3uxSetjeL3ntmGpYE"
    }
  }
  try {
    return axios.request(options).then((resp) => resp.data[0].id)
  } catch (error) {
    console.error(error)
  }
}

export async function fetchStandings(leagueID: string) {
  const tournamentID = await getTournamentID(leagueID) //only do this monthly? 10654

  const options = {
    method: 'GET',
    url: `https://api.pandascore.co/tournaments/${tournamentID}/standings`,
    params: {
      page: '1', // delete page options
      per_page: '100'
    },
    headers: {
      accept: 'application/json',
      authorization: "Bearer 3c_9nXv0AMBnWO81RbPJvz_GlEc4KvEO8W3uxSetjeL3ntmGpYE"
    }
  }
  
  try {
    return axios.request(options).then((resp) => resp.data)
  } catch (error) {
    console.error(error)
  }
}