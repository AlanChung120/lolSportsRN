import axios from 'axios'

export async function fetchMatches(leagueIDs: string, date: Date) {
  let end = new Date(date)
  end.setDate(date.getDate() + 1)
  const options = {
    method: 'GET',
    url: 'https://api.pandascore.co/lol/matches',
    params: {
      'filter[league_id]': leagueIDs,
      'range[scheduled_at]': date.toISOString() + ", " + end.toISOString(),
      sort: 'scheduled_at'
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