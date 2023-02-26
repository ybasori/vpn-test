<script setup lang="ts">
import InputRange from '@/components/atoms/InputRange/InputRange.vue'
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  value: number[]
  mouseUp: boolean
}>()
const mouseUp = ref(true)
const min = ref(500)
const max = ref(2000)
const emit = defineEmits(['update:value', 'update:mouseUp'])

const form = ref({
  minValue: 0,
  maxValue: 100
})

function toExact(value: number) {
  return Number(((value / 100) * (max.value - min.value) + min.value).toFixed(0)) * 100
}
function toPercentage(value: number) {
  return ((value / 100 - min.value) / (max.value - min.value)) * 100
}

watch(
  () => form.value.minValue,
  (newData) => {
    emit('update:value', [toExact(newData), props.value[1]])
  }
)
watch(
  () => form.value.maxValue,
  (newData) => {
    emit('update:value', [props.value[0], toExact(newData)])
  }
)
watch(
  () => mouseUp.value,
  (newData) => {
    emit('update:mouseUp', newData)
  }
)

onMounted(() => {
  form.value.minValue = toPercentage(props.value[0])
  form.value.maxValue = toPercentage(props.value[1])
})
</script>
<template>
  <div class="container-pricerange">
    <div class="label-pricerange">Harga</div>
    <div class="group-range">
      <div class="input-range-box">
        <InputRange
          v-model:is-mouse-up="mouseUp"
          v-model:max-value="form.maxValue"
          v-model:min-value="form.minValue"
        />
      </div>
      <div class="group-input-range">
        Rp
        <div class="input-range-border">
          {{ toExact(form.minValue).toLocaleString('id') }}
        </div>
        - Rp
        <div class="input-range-border">
          {{ toExact(form.maxValue).toLocaleString('id') }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.label-pricerange {
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 17px;

  color: #696969;
}
.input-range-border {
  background: rgba(248, 248, 248, 0.75);
  border: 1px solid #f2f2f2;
  padding: 10px 7px 9px 7px;

  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 11px;
  text-align: left;
  width: 100px;

  color: #868686;
}
.group-range {
  margin-top: 11px;
}
.group-input-range {
  display: flex;
  gap: 5px;
  margin-top: 26px;
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 11px;
  text-align: center;

  color: #868686;
  height: fit-content;
  align-items: center;
  justify-content: center;
}
</style>
