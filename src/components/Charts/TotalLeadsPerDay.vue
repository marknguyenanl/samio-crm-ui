<script setup>
import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import * as am5xy from '@amcharts/amcharts5/xy'
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { getDailyLeads } from '@/api/contacts'

// Sample data: total leads per day

// const leadsPerDay = [
//   { date: new Date(2025, 0, 1).getTime(), totalLeads: 5 },
//   { date: new Date(2025, 0, 2).getTime(), totalLeads: 8 },
//   { date: new Date(2025, 0, 3).getTime(), totalLeads: 3 },
//   { date: new Date(2025, 0, 4).getTime(), totalLeads: 10 },
//   { date: new Date(2025, 0, 5).getTime(), totalLeads: 6 },
//   { date: new Date(2025, 0, 6).getTime(), totalLeads: 12 },
//   { date: new Date(2025, 0, 7).getTime(), totalLeads: 9 },
// ]

const newLeadsChart = useTemplateRef('leadsPerDay')
let root = null

onMounted(async () => {
  const res = await getDailyLeads()
  const leadsPerDay = res.data
    .map((item) => ({
      date: Date.parse(item.date),
      total: item.total,
    }))
    .sort((a, b) => a.date - b.date)

  if (!newLeadsChart.value) return

  root = am5.Root.new(newLeadsChart.value)
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
      baseInterval: { timeUnit: 'day', count: 1 },
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
      stroke: '#f97a00',
      valueYField: 'total',
      valueXField: 'date',
      tooltip: am5.Tooltip.new(root, {
        labelText: '{valueY}',
      }),
    }),
  )

  series.data.setAll(leadsPerDay)

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
  <div
    class="rounded-lg p-4 flex-1 flex-col gap-2 bg-samio-butter-light border-samio-gold border shadow-sm text-samio-green"
  >
    <h4 class="text-sm font-semibold">Total Leads Per Day</h4>
    <div ref="leadsPerDay" class="w-full h-[340px]"></div>
  </div>
</template>
