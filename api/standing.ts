import axios from 'axios'

export function getTournamentID(leagueID: string) {
  const options = {
    method: 'GET',
    url: 'https://api.pandascore.co/leagues/' + leagueID + '/tournaments',
    params: {
      'filter[has_bracket]': 'false',
      page: '1',
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
      page: '1',
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