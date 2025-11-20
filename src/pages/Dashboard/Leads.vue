<script setup>
import { leads } from '@/db'
</script>

<template>
  <div class="">
    <h1>This is leads page</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Lead</th>
          <th>Tel</th>
          <th>Email</th>
          <th>Source</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <!-- Data rows will go here -->
        <tr v-for="(lead, index) in leads" :key="index">
          <td>{{ lead.id }}</td>
          <td>{{ lead.name }}</td>
          <td>{{ lead.tel }}</td>
          <td>{{ lead.email }}</td>
          <td>{{ lead.source }}</td>
          <td>{{ lead.address }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
