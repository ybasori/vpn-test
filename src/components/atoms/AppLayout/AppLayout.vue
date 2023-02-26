<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
onMounted(() => {
  store.dispatch('loadAuth')
})
</script>
<template>
  <slot></slot>
</template>
