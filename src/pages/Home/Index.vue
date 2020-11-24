<template>
  <q-page class="page column items-center">
    <div id="particles-js"></div>
    <q-img src="sw.png" style="width: 20vw"></q-img>
    <p style="color: white">Planets</p>
    <div ref="table">
      <Table :columns="columns" :planets="planets" class="table"/>
    </div>
  </q-page>
</template>

<script>
import { gsap } from 'gsap'
import { initParticles } from '../../js/particles'
import Table from '../../components/Table'
import { onMounted, ref } from '@vue/composition-api'
import { getPlanets } from '../../js/swapi'
import { makeColumns } from '../../js/table'
export default {
  name: 'PageIndex',
  components: {
    Table
  },
  setup () {
    const table = ref(null)
    const planets = ref([])
    const columns = ref([])
    onMounted(() => {
      initParticles()
      getPlanets().then((data) => {
        planets.value = data
        columns.value = makeColumns(Object.keys(planets.value[0]))
        gsap.from(table.value, { y: 800, duration: 0.5 })
      })
    })
    return { planets, columns, table }
  }
}
</script>
<style scoped>
.page {
  background: black
}
#particles-js{
  width: 100%;
  height: 100%;
  position: fixed;
  display: block;
  z-index: 0;
}
.table {
  z-index: 2;
}
p {
  font-size: 24px;
}
</style>
