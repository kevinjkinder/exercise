// array of properties names which need to be sorted as numbers and arrays
const numberProps = ['diameter', 'rotation_period', 'orbital_period', 'surface_water', 'population']
const arrayProps = ['films', 'residents']
// format prop to label
function format (str) {
  str = str.charAt(0).toUpperCase() + str.slice(1)
  return str.replace('_', ' ')
}
// arr.sort compare functions by value (compareNumbers), length (compareLength), alphabetically (compareStrings)
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
// array sort based on property to sort and type of compare function
export function sortBy (arr, prop) {
  numberProps.includes(prop) ? arr.sort(compareNumbers(prop)) : (arrayProps.includes(prop) ? arr.sort(compareLength(prop)) : arr.sort(compareStrings(prop)))
  return arr
}
// return array with subarrays of "size" length
export function chunk (array, size) {
  const chunkedArr = []
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size)
    chunkedArr.push(chunk)
  }
  return chunkedArr
}
// create array of column objects with prop name and label
export function makeColumns (keys) {
  var arr = []
  for (let i = 0; i < keys.length; i++) {
    var obj = { field: keys[i], label: format(keys[i]) }
    arr.push(obj)
  }
  return arr
}
