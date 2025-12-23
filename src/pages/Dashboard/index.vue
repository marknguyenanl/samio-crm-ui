<script setup>
import TotalLeadsPerDay from '@/components/Charts/TotalLeadsPerDay.vue'
import TotalSalesPerDay from '@/components/Charts/TotalSalesPerDay.vue'
import ConversionRateAverage from '@/components/Charts/ConversionRateAverage.vue'
import OrdersFrequencyAverage from '@/components/Charts/OrdersFrequencyAverage.vue'
import ProfitRateAverage from '@/components/Charts/ProfitRateAverage.vue'
import SalesAverage from '@/components/Charts/SalesAverage.vue'
</script>

<template>
  <div class="bg-[#FFFEFE] sticky left-0 top-20 z-20 p-2 pt-4 h-full w-full shadow-sm">
    <ul class="text-samio-green flex flex-row gap-2">
      <!-- todo: period 7 days and 30 days enable -->
      <li
        class="text-sm cursor-pointer px-4 py-1 border-samio-butter hover:border-samio-orange transition-all duration-300 border rounded-lg"
      >
        Lifetime
      </li>
    </ul>
  </div>
  <div class="mt-4 px-4 w-full gap-4">
    <TotalLeadsPerDay />
    <div class="mt-4 grid grid-cols-2 gap-4">
      <div class="gap-4 grid grid-cols-2 grid-rows-2">
        <ConversionRateAverage />
        <OrdersFrequencyAverage />
        <SalesAverage />
        <ProfitRateAverage />
      </div>
      <div class="">
        <TotalSalesPerDay />
      </div>
    </div>
  </div>
</template>
