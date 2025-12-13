<template>
  <div class="border-samio-gold border p-4 rounded-lg bg-samio-butter-light shadow-sm">
    <h4 class="text-samio-green font-semibold text-sm">Average Sales</h4>
    <div class="flex flex-col items-center justify-center h-full -translate-y-4 gap-1">
      <p class="text-3xl font-semibold text-samio-orange-dark">${{ avgSales.toFixed(2) }}</p>
      <p class="text-xs text-samio-green-light">
        {{ compareRate >= 0 ? '▲' : '▼' }} {{ compareRate.toFixed(2) }}% vs last month
      </p>
    </div>
  </div>
</template>

<script setup>
const avgSales = 125.4
const compareRate = 8.4
</script>
