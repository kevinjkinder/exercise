<template>
  <div>
    <q-dialog v-model="alert" persistent>
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">{{ data.title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none column items-center">
          <q-circular-progress
            style="color: #E3C318"
            indeterminate
            size="30px"
            class="q-ma-md"
            v-if="data.arr.length === 0"
          />
          <p v-for="(item, index) in data.arr" :key="index"><b>{{ index + 1 }}</b>-  {{ item }} </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="CLOSE" style="color: #E3C318" @click="close"  />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    alert: {
      default: false
    },
    data: {
      default: function () {
        return { arr: [0, 1, 2], title: 'Planet' }
      }
    }
  },
  setup (props, context) {
    function close () {
      context.emit('close')
    }
    return { close }
  }
}
</script>

<style scoped>

</style>
