import axios from 'axios'

var planetsUrl = 'http://swapi.dev/api/planets/?page='

export async function getPlanets () {
  var page = 1
  var done = false
  var arr = []
  while (!done) {
    var data = (await axios.get(`${planetsUrl}${page++}`)).data
    arr.push(...data.results)
    !data.next ? done = true : done = false
  }
  return arr
}
