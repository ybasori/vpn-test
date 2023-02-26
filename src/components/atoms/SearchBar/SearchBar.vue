<script setup lang="ts">
import IconSearchVue from '@/components/icons/IconSearch.vue'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

const keyword = ref('')
const store = useStore()
function onSubmit() {
  store.dispatch('setFilterProduct', { keyword: keyword.value })
  store.dispatch('getProduct')
}
onMounted(() => {
  keyword.value = store.getters.filterProduct.keyword
})
</script>
<template>
  <form class="container-search" @submit.prevent="onSubmit">
    <input type="text" class="input" placeholder="Cari produk" v-model="keyword" />
    <button type="submit" class="button"><IconSearchVue /></button>
  </form>
</template>
<style scoped>
.container-search {
  width: 521px;
  height: 57px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  padding: 0;
  display: flex;
  align-items: center;
}
.input {
  border: none;
  padding: 21px 0px 21px 24px;
  width: 100%;
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  border-radius: 9px 0px 0px 9px;
}
.input:focus-visible {
  outline: none;
}
.button {
  width: 85px;
  height: 100%;
  margin-left: auto;
  background: #eb3f36;
  border: none;
  border-radius: 0px 9px 9px 0px;
}
</style>
