const numberProps = ['diameter', 'rotation_period', 'orbital_period', 'surface_water', 'population']

function format (str) {
  str = str.charAt(0).toUpperCase() + str.slice(1)
  return str.replace('_', ' ')
}

function compareNumbers (prop) {
  return function (a, b) {
    if (isNaN(a[prop])) {
      return 1
    } else if (isNaN(b[prop])) {
      return -1
    } else return parseFloat(a[prop]) - parseFloat(b[prop])
  }
}

function compareLength (prop) {
  return function (a, b) {
    return a[prop].length - b[prop].length
  }
}

function compareStrings (prop) {
  return function (a, b) {
    return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0)
  }
}

export function sortBy (arr, prop) {
  console.log('start')
  numberProps.includes(prop) ? arr.sort(compareNumbers(prop)) : ((prop === 'residents' || prop === 'films') ? arr.sort(compareLength(prop)) : arr.sort(compareStrings(prop)))
  return arr
}
export function chunk (array, size) {
  const chunkedArr = []
  for (let i = 0; i < array.length; i++) {
    const last = chunkedArr[chunkedArr.length - 1]
    if (!last || last.length === size) {
      chunkedArr.push([array[i]])
    } else {
      last.push(array[i])
    }
  }
  return chunkedArr
}

export function makeColumns (keys) {
  var arr = []
  for (let i = 0; i < keys.length; i++) {
    var obj = { field: keys[i], label: format(keys[i]) }
    arr.push(obj)
  }
  return arr
}
