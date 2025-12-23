<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/api/axios'
const contactStages = ref([])
const fetchContactStages = async () => {
  const res = await api.get('/v1/contact-stages')
  return res.data.data
}

onMounted(async () => {
  contactStages.value = await fetchContactStages()
})
</script>

<template>
  <div class="">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Key</th>
          <th>Label</th>
          <th>Order</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stage in contactStages" :key="stage.key">
          <td>{{ stage.key }}</td>
          <td>{{ stage.label }}</td>
          <td>{{ stage.order }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
