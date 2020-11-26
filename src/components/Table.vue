<template>
  <div class="q-pa-md">
    <q-circular-progress
      style="color: #E3C318"
      indeterminate
      size="50px"
      class="q-ma-md"
      v-if="data.length === 0"
    />
    <table id="table" style="max-height: 10vh">
      <tr>
        <th v-for="(title, index) in columns" :key="index" @click="sort(title.field)" >
          <div>{{ title.label }}
            <q-icon size="sm" name="import_export" :class="{ 'active': (title.field) === lastSorted }"/>
          </div>
        </th>
      </tr>
      <tr v-for="(planet, index) in chunks[page - 1]" :key="index">
        <td v-for="(prop, name) in planet" :key="name">
          <div v-if="typeof prop === 'object'" class="row items-center justify-center">
            <div>{{ prop.length }}</div>
            <q-icon v-if="prop.length !== 0" name="visibility" class="q-px-sm" @mouseover="alert(prop, planet.name, name)"></q-icon>
          </div>
          <div v-if="typeof prop !== 'object'" class="text-center">{{ prop }}</div>
          <q-tooltip v-if="(prop.length > 15)">
          {{ prop }}
          </q-tooltip>
        </td>
      </tr>
    </table>
      <q-pagination
      class="q-py-md"
      v-model="page"
      color="white"
      text-color="black"
      :max="chunks.length"
      :boundary-links="true"
      v-if="data.length !== 0"
    >
    </q-pagination>
  </div>
</template>

<script>
import { computed, ref } from '@vue/composition-api'
import { sortBy, chunk } from '../js/table'
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
    const field = ref('')
    const data = computed(() => sortBy(props.planets, field.value))
    const chunks = computed(() => chunk(props.planets, 10))
    const page = ref(1)

    function sort (fl) {
      field.value = fl
      lastSorted.value = fl
    }

    function changePage (pg) {
      page.value = pg
    }

    function alert (arr, planet, param) {
      context.emit('alert', { arr: arr, title: `${planet} / ${param}` })
    }
    return { sortBy, sort, lastSorted, data, chunks, page, changePage, alert }
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
  max-width: 130px;
  min-width: 130px;
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
