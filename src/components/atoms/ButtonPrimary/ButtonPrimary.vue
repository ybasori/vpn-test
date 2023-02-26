<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset' | undefined
}>()
</script>

<template>
  <button class="container" :type="type ?? 'button'">
    <slot></slot>
  </button>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  background: #eb3f36;
  box-shadow: 0px 7px 6px rgba(0, 0, 0, 0.17);
  border-radius: 7px;
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 17px;
  text-align: center;

  color: #ffffff;
  padding: 21px 0px;
  cursor: pointer;
  border: none;
}
</style>
