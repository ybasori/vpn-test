<script setup lang="ts">
import PriceRange from '@/components/molecules/PriceRange/PriceRange.vue'
import { ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const form = ref({ price: [100000, 150000] })
const mouseUp = ref(true)

watch(
  () => mouseUp.value,
  (newData) => {
    if (newData) {
      store.dispatch('setFilterProduct', { price: form.value.price })
      store.dispatch('getProduct')
    }
  }
)

onMounted(() => {
  form.value.price = store.getters.filterProduct.price
})
</script>
<template>
  <div class="container-filterbar">
    <div class="filter-item">
      <div class="filter-title">URUTKAN BERDASARKAN</div>
      <div class="filter-title-below"></div>
      <div class="filter-content">
        <PriceRange v-model:mouse-up="mouseUp" v-model:value="form.price" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.filter-title {
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 17px;

  color: #696969;
  background: rgba(245, 245, 245, 0.75);
  height: 41px;
  display: flex;
  align-items: center;
  padding-left: 14px;
}
.filter-title-below {
  height: 1px;
  background: rgba(217, 217, 217, 0.75);
}
.filter-content {
  padding: 5px 0 0 0;
}
</style>
