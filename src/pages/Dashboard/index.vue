<script setup>
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue'

// Sample data: total leads per day
const leadsPerDay = [
  { date: new Date(2025, 0, 1).getTime(), totalLeads: 5 },
  { date: new Date(2025, 0, 2).getTime(), totalLeads: 8 },
  { date: new Date(2025, 0, 3).getTime(), totalLeads: 3 },
  { date: new Date(2025, 0, 4).getTime(), totalLeads: 10 },
  { date: new Date(2025, 0, 5).getTime(), totalLeads: 6 },
  { date: new Date(2025, 0, 6).getTime(), totalLeads: 12 },
  { date: new Date(2025, 0, 7).getTime(), totalLeads: 9 },
]

const newLeadsChart = useTemplateRef('new_leads')
let root = null

onMounted(() => {
  if (!newLeadsChart.value) return

  root = am5.Root.new(newLeadsChart.value)
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
    am5xy.ColumnSeries.new(root, {
      name: 'Total Leads',
      xAxis,
      yAxis,
      valueYField: 'totalLeads',
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
  <!-- fix: Dashboard styling of button logout and button component -->
  <div class="bg-red-800">New Dashboard here</div>
  <div class="total-lead">Total Leads</div>
  <div ref="new_leads" class="w-full h-80"></div>
</template>
