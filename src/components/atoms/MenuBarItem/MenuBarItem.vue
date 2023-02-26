<script setup lang="ts">
import IconCarret from '@/components/icons/IconCarret.vue'

defineProps<{
  name: string
}>()
</script>
<template>
  <div class="container-menubaritem">{{ name }} <IconCarret color="#FFFFFF" /></div>
</template>
<style scoped>
.container-menubaritem {
  background: #eb3f36;
  padding: 23px 44px 24px;
  width: fit-content;
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 19px;

  color: #ffffff;
  text-transform: uppercase;
  display: flex;
  align-items: center;
}
</style>
