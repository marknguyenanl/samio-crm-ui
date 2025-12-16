<script setup>
import TotalLeadsPerDay from '@/components/Charts/TotalLeadsPerDay.vue'
import TotalSalesPerDay from '@/components/Charts/TotalSalesPerDay.vue'
import ConversionRateAverage from '@/components/Charts/ConversionRateAverage.vue'
import OrdersFrequencyAverage from '@/components/Charts/OrdersFrequencyAverage.vue'
import ProfitRateAverage from '@/components/Charts/ProfitRateAverage.vue'
import SalesAverage from '@/components/Charts/SalesAverage.vue'
</script>

<template>
  <div class="flex flex-row">
    <aside class="fixed self-start left-0 top-20 z-19 bg-samio-gold p-4 h-full w-40 shadow-sm">
      <ul class="text-samio-green flex flex-col gap-2">
        <li
          class="cursor-pointer px-4 py-1 border-samio-butter hover:border-samio-orange transition-all duration-300 border rounded-lg"
        >
          Day
        </li>
        <!-- <li -->
        <!--   class="cursor-pointer px-4 py-1 border-samio-butter hover:border-samio-orange transition-all duration-300 border rounded-lg" -->
        <!-- > -->
        <!--   Month -->
        <!-- </li> -->
        <!-- <li>Quarter</li> -->
        <!-- <li>SemiQuarter</li> -->
        <!-- <li>Year</li> -->
      </ul>
    </aside>
    <div class="ml-40 mt-2 px-4 w-full gap-4">
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
  </div>
</template>
