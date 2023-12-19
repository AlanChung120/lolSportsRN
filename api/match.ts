import axios from 'axios'


export async function fetchMatches() {
  const options = {
    method: 'GET',
    url: 'https://api.pandascore.co/lol/matches',
    params: {
      'range[scheduled_at][0]': '2023-07-30T00:00:00Z' ,
      sort: 'scheduled_at',
      page: '1',
      per_page: '100'
    },
    headers: {
      accept: 'application/json',
      authorization: "Bearer 3c_9nXv0AMBnWO81RbPJvz_GlEc4KvEO8W3uxSetjeL3ntmGpYE"
    }
  }
      
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    })
}