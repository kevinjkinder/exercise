<template>
  <div class="q-pa-md">
    <q-circular-progress
      style="color: #E3C318"
      indeterminate
      size="50px"
      class="q-ma-md"
      v-if="planets.length === 0"
    />
    <table id="table" style="max-height: 10vh">
      <tr>
        <th v-for="(title, index) in columns" :key="index" @click="sort(title.field)" >
          <div>{{ title.label }}
            <q-icon size="sm" name="import_export" :class="{ 'active': (title.field) === lastSorted }"/>
          </div>
        </th>
      </tr>
      <tr v-for="(planet, index) in planets" :key="index">
        <td v-for="(prop, index) in planet" :key="index">{{ prop }}
          <q-tooltip v-if="(typeof prop === 'object' || prop.length > 10)">
          {{ prop }}
          </q-tooltip>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { sortBy } from '../js/table'
export default {
  name: 'Table',
  props: {
    planets: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  setup (props, context) {
    const lastSorted = ref('')

    function sort (field) {
      field !== lastSorted.value ? props.planets = sortBy(props.planets, field) : props.planets.reverse()
      lastSorted.value = field
    }
    return { sortBy, sort, lastSorted }
  }
}
</script>

<style scoped>
#table {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  border-collapse: collapse;
}

td, th {
  border: 1px solid #ddd;
  padding: 8px;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#table tr:nth-child(even) {
  background-color: #f2f2f2;
}
#table tr:nth-child(odd) {
  background-color: white;
}

#table tr:hover {background-color: #ddd;}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #E3C318;
  color: white;
}
.active {
  color: black;
}
</style>
