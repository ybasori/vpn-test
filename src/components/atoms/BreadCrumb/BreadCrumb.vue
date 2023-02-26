<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{ path: string }>()
const router = useRouter()
</script>
<template>
  <div class="container-breadcrumb">
    <template v-for="(str, i) in path.split('/')" v-bind:key="i">
      <div
        :class="`path ${path.split('/').length - 1 === i ? 'active' : ''}`"
        @click="router.push('/')"
      >
        {{ str }}
      </div>
      <div v-if="path.split('/').length - 1 !== i" class="divider">&raquo;</div>
    </template>
  </div>
</template>
<style scoped>
.container-breadcrumb {
  display: flex;
  gap: 18px;
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 13px;
  text-align: center;

  color: #696969;
  padding: 14px 0px 13px;
}
.path.active {
  color: #eb3f36;
}
</style>
