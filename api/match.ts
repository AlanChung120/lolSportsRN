import axios from 'axios'

export async function fetchMatches(leagueIDs: string, date: string) {
  const start = new Date(date + " 00:00:00 UTC").toISOString()
  const end = new Date(date + " 23:59:59 UTC").toISOString()
  const options = {
    method: 'GET',
    url: 'https://api.pandascore.co/lol/matches',
    params: {
      'filter[league_id]': leagueIDs,
      'range[scheduled_at]': start + ", " + end,
      sort: 'scheduled_at',
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