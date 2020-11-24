import axios from 'axios'

var planetsUrl = 'https://swapi.dev/api/planets/?page='

export async function getPlanets () {
  var page = 1
  var done = false
  var arr = []
  while (!done) {
    var data = (await axios.get(`${planetsUrl}${page++}`)).data
    arr.push(...data.results)
    arr.pop()
    !data.next ? done = true : done = false
  }
  arr.forEach(function (item) { delete item.url })
  return arr
}
