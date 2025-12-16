<script setup>
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { onMounted, onBeforeUnmount, useTemplateRef, computed } from 'vue'
import { useContactStore } from '@/stores/contact'
const contactStore = useContactStore()

// Sample data: total leads per day

const totalLeadPerMonth = computed(() => contactStore.totalLeadsPerMonth)
const leadsPerMonth = [
  { date: new Date(2025, 0, 1).getTime(), totalLeads: 35 }, // Jan
  { date: new Date(2025, 1, 1).getTime(), totalLeads: 48 }, // Feb
  { date: new Date(2025, 2, 1).getTime(), totalLeads: 27 }, // Mar
]

const newLeadsMonthChart = useTemplateRef('total_leads_per_month')
let root = null

onMounted(() => {
  if (!newLeadsMonthChart.value) return

  root = am5.Root.new(newLeadsMonthChart.value)
  root._logo?.dispose()

  root.setThemes([am5themes_Animated.new(root)])

  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: 'panX',
      wheelY: 'zoomX',
      layout: root.verticalLayout,
    }),
  )

  const xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      baseInterval: { timeUnit: 'month', count: 1 },
      renderer: am5xy.AxisRendererX.new(root, {}),
    }),
  )

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    }),
  )

  const series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: 'Total Leads',
      xAxis,
      yAxis,
      valueYField: 'totalLeads',
      valueXField: 'date',
      tooltip: am5.Tooltip.new(root, {
        labelText: '{valueY}',
      }),
      stroke: am5.color(0x386641),
    }),
  )

  series.data.setAll(leadsPerMonth)

  chart.set(
    'cursor',
    am5xy.XYCursor.new(root, {
      behavior: 'zoomX',
    }),
  )
})

onBeforeUnmount(() => {
  if (root) {
    root.dispose()
  }
})
</script>

<template>
  <div class="rounded-lg p-4 flex-1 flex-col gap-2 bg-samio-cream-light text-samio-green">
    <h3 class="text-samio-orange-dark font-semibold">Total Leads Per Month</h3>
    <div ref="total_leads_per_month" class="w-full h-80"></div>
  </div>
</template>
