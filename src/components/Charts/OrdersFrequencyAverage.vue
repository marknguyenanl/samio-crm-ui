<script setup>
import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5radar from '@amcharts/amcharts5/radar'
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'

const chartDiv = useTemplateRef('orders-frequency-average')
let root = null

onMounted(() => {
  if (!chartDiv.value) return

  root = am5.Root.new(chartDiv.value)
  root._logo?.dispose()

  root.setThemes([am5themes_Animated.new(root)])

  const chart = root.container.children.push(
    am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      startAngle: -180,
      endAngle: 0,
    }),
  )

  const axisRenderer = am5radar.AxisRendererCircular.new(root, {
    innerRadius: -5,
    minGridDistance: 20,
    strokeOpacity: 1,
    strokeWidth: 4,
    strokeGradient: am5.LinearGradient.new(root, {
      rotation: 0,
      stops: [
        { color: am5.color(0xfb7116) },
        { color: am5.color(0xf6d32b) },
        { color: am5.color(0xf4fb16) },
        { color: am5.color(0x19d228) },
      ],
    }),
  })
  axisRenderer.ticks.template.setAll({
    visible: true,
    strokeOpacity: 0.5,
  })
  const xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      max: 100,
      strictMinMax: true,
      renderer: axisRenderer,
    }),
  )
  const axisDataItem = xAxis.makeDataItem({})

  const value = 45
  axisDataItem.set('value', value)
  //
  axisDataItem.set(
    'bullet',
    am5xy.AxisBullet.new(root, {
      sprite: am5radar.ClockHand.new(root, {
        topWidth: 1,
        bottomWidth: 7,
        radius: -3,
        innerRadius: -10,
      }),
    }),
  )

  xAxis.createAxisRange(axisDataItem)
  axisDataItem.get('grid').set('visible', false)

  // Make stuff animate on load

  chart.appear(1000, 300)
})

onBeforeUnmount(() => {
  if (root) {
    root.dispose()
    root = null
  }
})
</script>
<template>
  <div
    class="flex flex-col gap-4 shadow-sm p-4 text-samio-green bg-samio-butter-light border-samio-gold border rounded-lg w-full h-full"
  >
    <h4 class="text-sm font-semibold">Orders Frequency Average Per Day</h4>
    <div ref="orders-frequency-average" class="h-full w-full"></div>
  </div>
</template>
