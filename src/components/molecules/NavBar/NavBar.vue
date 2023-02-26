<script setup lang="ts">
import SearchBar from '@/components/atoms/SearchBar/SearchBar.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import IconShoppingBag from '@/components/icons/IconShoppingBag.vue'
import IconUser from '@/components/icons/IconUser.vue'
import IconCarret from '@/components/icons/IconCarret.vue'
</script>

<template>
  <div class="container-navbar">
    <div class="right">
      <SearchBar />
      <div class="button heart">
        <IconHeart color="#696969" />
      </div>
      <div class="button shopping">
        <IconShoppingBag />
      </div>
      <div class="button user">
        <IconUser />
        <IconCarret color="#696969" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.container-navbar {
  display: flex;
  padding: 24px;
}
.right {
  width: fit-content;
  margin-left: auto;
  display: flex;
  align-items: center;
}
.button {
  margin-left: 24px;
  cursor: pointer;
}
</style>
