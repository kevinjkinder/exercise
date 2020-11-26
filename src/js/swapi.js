import axios from 'axios'

// iterate through the "planets" pages and return an array with all the results after
export async function getPlanets () {
  var planetsUrl = 'https://swapi.dev/api/planets/?page='
  var page = 1
  var done = false
  var arr = []
  while (!done) {
    var data = (await axios.get(`${planetsUrl}${page++}`)).data
    arr.push(...data.results)
    !data.next ? done = true : done = false
  }
  arr.forEach(function (item) { delete item.url })
  return arr
}
