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
// get and return residents names or films names of an array of endpoints
export async function getData (arr) {
  var a = []
  Promise.all(arr.map(l => axios.get(l))).then(data => {
    data.forEach((obj) => {
      if (obj.data.name) {
        a.push(obj.data.name)
      } else if (obj.data.title) {
        a.push(obj.data.title)
      }
    })
  })
  return a
}
