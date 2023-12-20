import axios from 'axios'


export async function fetchMatches() {
  const options = {
    method: 'GET',
    url: 'https://api.pandascore.co/lol/matches',
    params: {
      'filter[league_id]': '293',
      'range[scheduled_at]': '2023-07-30T00:00:00Z, 2023-07-30T23:59:59Z' ,
      sort: 'scheduled_at',
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
    console.error(error);
  }

}