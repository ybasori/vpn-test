<script setup lang="ts">
import { ref, onMounted } from 'vue'
const props = defineProps<{
  placeholder: string
  type: string
  value: string
}>()

const emit = defineEmits(['update:value'])
const postType = ref('')
function onChangeType() {
  if (postType.value === 'password') {
    postType.value = 'text'
  } else {
    postType.value = 'password'
  }
}
function updateValue(event: Event) {
  emit('update:value', (event.target as EventTarget & { value: string }).value)
}

onMounted(() => {
  postType.value = props.type ?? ''
})
</script>

<template>
  <div class="input-border">
    <input
      class="input"
      :placeholder="placeholder"
      :type="postType"
      :value="value"
      @input="updateValue"
    />
    <div v-if="type == 'password' && postType == 'password'" class="show" @click="onChangeType">
      Show
    </div>
    <div v-if="type == 'password' && postType == 'text'" class="show" @click="onChangeType">
      Hide
    </div>
  </div>
</template>

<style scoped>
.input-border {
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  padding: 20px 18px 24px;
  display: flex;
  align-items: center;
}
.input {
  width: 100%;

  border: none;

  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
}
.input:focus-visible {
  outline: none;
}
.show {
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;

  color: #730c07;
  cursor: pointer;
}
</style>
