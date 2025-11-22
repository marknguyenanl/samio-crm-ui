<script setup>
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
import { contacts } from '@/db'

// todo: count total each stage

const new_leads_chart = useTemplateRef('new_leads')
let root = null
onMounted(() => {
  root = am5.Root.new(new_leads_chart.value)
  root.setThemes([am5themes_Animated.new(root)])
  let chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panY: false,
      layout: root.verticalLayout,
    }),
  )
  // Create Y axis
  let yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    }),
  )
  // Create X axis
  let xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      min: new Date(2017, 0, 1).getTime(),
      max: new Date().getTime(),
      baseInterval: { timeUnit: 'day', count: 1 },
      dateFormats: { day: 'yyyy/MM/dd' },
      markUnitChange: false,
      renderer: am5xy.AxisRendererX.new(root, {}),
    }),
  )
  // fix: fix this xAxis to use date not category
  xAxis.data.setAll(contacts)
  // Create series
  let series1 = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: 'Series',
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: 'stage',
      categoryField: 'created_at',
    }),
  )
  series1.data.setAll(contacts)

  let series2 = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: 'Series',
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: 'stage',
      categoryField: 'created_at',
    }),
  )
  series2.data.setAll(contacts)
  // Add legend
  let legend = chart.children.push(am5.Legend.new(root, {}))
  legend.data.setAll(chart.series.values)

  // Add cursor
  chart.set('cursor', am5xy.XYCursor.new(root, {}))
})
// Cleanup
onBeforeUnmount(() => {
  if (root) root.dispose()
})
</script>

<template>
  <!-- fix: styling of button logout and button component -->
  <div class="bg-red-800">New Dashboard here</div>
  <div class="total-lead">Total Leads</div>
  <div ref="new_leads" class="w-full h-80"></div>
</template>
