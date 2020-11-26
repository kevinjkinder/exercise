<template>
  <q-page class="page column items-center">
    <div id="particles-js"></div>
    <q-img src="sw.png" style="width: 20vw"></q-img>
    <p style="color: white">Planets</p>
    <div ref="table" class="table">
    <Table @alert="getAlertData" :columns="columns" :planets="planets"/>
    <Alert :alert="alert" @close="activeAlert" v-if="alert" :data="alertData"/>
    </div>
  </q-page>
</template>

<script>
import { gsap } from 'gsap'
import { initParticles } from '../../js/particles'
import Table from '../../components/Table'
import Alert from '../../components/Alert'
import { onMounted, ref } from '@vue/composition-api'
import { getPlanets, getData } from '../../js/swapi'
import { makeColumns } from '../../js/table'
export default {
  name: 'PageIndex',
  components: {
    Table,
    Alert
  },
  setup () {
    const table = ref(null)
    const planets = ref([])
    const columns = ref([])
    const alert = ref(false)
    const alertData = ref({})
    function activeAlert () {
      alert.value = !alert.value
    }
    async function getAlertData (data) {
      alertData.value = {}
      getData(data.arr).then((d) => {
        alertData.value = {
          arr: d,
          title: data.title
        }
      }).then(() => activeAlert(true))
    }
    onMounted(() => {
      initParticles('particles-js')
      getPlanets().then((data) => {
        planets.value = data
        columns.value = makeColumns(Object.keys(planets.value[0]))
        gsap.from(table.value, { y: 200, duration: 0.6, opacity: 0.1 })
      })
    })
    return { planets, columns, table, alert, activeAlert, getAlertData, alertData }
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
}
p {
  font-size: 24px;
}
</style>
