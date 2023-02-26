<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  minValue: number
  maxValue: number
  isMouseUp: boolean
}>()

const emit = defineEmits(['update:minValue', 'update:maxValue', 'update:isMouseUp'])
const minus = ref(0)
const areaRange = ref<HTMLDivElement | null>(null)
function toPrecentage(value: number) {
  return (value / (areaRange.value?.clientWidth ?? 0)) * 100
}
function toNormal(value: number) {
  return (value / 100) * (areaRange.value?.clientWidth ?? 0)
}
function onMouseUp() {
  document.onmouseup = null
  document.onmousemove = null
  emit('update:isMouseUp', true)
}
function onMouseMoveMinRange(e: MouseEvent) {
  e = e || window.event
  e.preventDefault()
  const min = e.pageX - minus.value
  if (min >= 0 && min <= toNormal(props.maxValue) - 14) {
    emit('update:minValue', toPrecentage(min))
  }
}
function onMousedownMinRange(e: MouseEvent) {
  e = e || window.event
  e.preventDefault()
  const min = e.pageX - minus.value
  if (min >= 0 && min <= toNormal(props.maxValue) - 14) {
    emit('update:minValue', toPrecentage(min))
  }
  document.onmouseup = onMouseUp
  document.onmousemove = onMouseMoveMinRange
  emit('update:isMouseUp', false)
}
function onMouseMoveMaxRange(e: MouseEvent) {
  e = e || window.event
  e.preventDefault()
  const max = e.pageX - minus.value
  if (max >= toNormal(props.minValue) + 14 && max <= (areaRange.value?.clientWidth ?? 0)) {
    emit('update:maxValue', toPrecentage(max))
  }
}
function onMousedownMaxRange(e: MouseEvent) {
  e = e || window.event
  e.preventDefault()
  emit('update:maxValue', toPrecentage(e.pageX - minus.value))
  document.onmouseup = onMouseUp
  document.onmousemove = onMouseMoveMaxRange
  emit('update:isMouseUp', false)
}

onMounted(() => {
  minus.value = areaRange.value?.getBoundingClientRect().left ?? 0
})
</script>
<template>
  <div class="container-range">
    <div class="area-range" ref="areaRange">
      <div
        class="range"
        :style="{
          left: `${toNormal(minValue)}px`,
          width: `${toNormal(maxValue) - toNormal(minValue)}px`
        }"
      ></div>
      <div
        class="circle-range"
        :style="{ left: `${toNormal(minValue) - 14 * (2 / 4)}px` }"
        @mousedown="onMousedownMinRange"
      ></div>
      <div
        class="circle-range"
        :style="{ left: `${toNormal(maxValue) - 14 * (2 / 4)}px` }"
        @mousedown="onMousedownMaxRange"
      ></div>
    </div>
  </div>
</template>
<style scoped>
.container-range {
  padding: 0px 4px;
}
.area-range {
  width: 100%;
  height: 6px;
  background: #757575;
  border-radius: 9px;
  display: flex;
  position: relative;
}
.circle-range {
  margin-top: -4px;
  width: 14px;
  height: 14px;
  background: #eb3f36;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
}
.range {
  background: #eb3f36;
  height: 100%;
}
</style>
