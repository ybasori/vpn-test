<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import NavBar from '@/components/molecules/NavBar/NavBar.vue'
import MenuBar from '@/components/molecules/MenuBar/MenuBar.vue'
import BreadCrumb from '@/components/atoms/BreadCrumb/BreadCrumb.vue'
import FilterBar from '@/components/molecules/FilterBar/FilterBar.vue'
import AppLayout from '@/components/atoms/AppLayout/AppLayout.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconCarret from '@/components/icons/IconCarret.vue'

const store = useStore()
const router = useRouter()
const form = ref({ limit: 10, order: ['product_name', 'ASC'], page: 1 })
function onCount(value: number) {
  let dt: number[] = []
  for (let i = 1; i <= value; i++) {
    dt = [...dt, i]
  }

  return dt
}
onMounted(() => {
  if (store.getters.auth === null) {
    router.push('/login')
  }
  store.dispatch('getProduct')
  form.value.limit = store.getters.filterProduct.limit
  form.value.order = store.getters.filterProduct.order
})

watch(
  () => form.value.limit,
  (newData) => {
    store.dispatch('setFilterProduct', { limit: newData })
    store.dispatch('getProduct')
  }
)
watch(
  () => form.value.order,
  (newData) => {
    store.dispatch('setFilterProduct', { order: newData })
    store.dispatch('getProduct')
  }
)
watch(
  () => form.value.page,
  (newData) => {
    store.dispatch('setFilterProduct', { page: newData })
    store.dispatch('getProduct')
  }
)
</script>

<template>
  <AppLayout>
    <NavBar />
    <MenuBar />
    <div :style="{ 'margin-top': '24px', 'margin-left': '70px' }">
      <BreadCrumb path="Home/Produk/Roasted Bean" />
    </div>
    <div class="content">
      <div class="filterbar">
        <FilterBar />
      </div>
      <div class="main-content">
        <div class="action-content">
          <div class="limit-selection">
            Menampilkan
            <select class="select-limit" v-model="form.limit">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="15">15</option>
            </select>
            dari {{ store.getters.product?.total ?? 0 }}
          </div>
          <div class="order-selection">
            Urutkan
            <select class="select-order" v-model="form.order">
              <option :value="['product_name', 'ASC']">Nama Produk</option>
            </select>
          </div>
        </div>
        <div class="list-content">
          <template v-for="(item, i) in store.getters.product?.list" v-bind:key="i">
            <RouterLink :to="'/' + item.slug" class="list-item">
              <template
                v-for="(image, j) in item.images.filter((_:unknown, k:number) => k == 0)"
                v-bind:key="j"
              >
                <img :src="image.image_url" class="item-image" loading="lazy" />
              </template>
              <div class="item-title">
                {{ item.name }}
              </div>
              <div class="item-seller">
                {{ item.short_description }}
              </div>
              <div class="item-group-star">
                <IconStar />
                <IconStar />
                <IconStar />
                <IconStar />
                <IconStar />
              </div>
              <div class="item-price">Rp {{ (item.price ?? '0').toLocaleString('id') }}</div>
            </RouterLink>
          </template>
        </div>
        <div class="pagination">
          <div
            class="page-button"
            @click="form.page = form.page - 1 >= 1 ? form.page - 1 : form.page"
          >
            <div class="caret-prev"><IconCarret color="#959595" /></div>
          </div>
          <div
            v-for="(dt, i) in onCount(Math.ceil((store.getters.product?.total ?? 0) / form.limit))"
            class="page-button"
            v-bind:key="i"
            @click="form.page = dt"
          >
            {{ dt }}
          </div>
          <div
            class="page-button"
            @click="
              form.page =
                form.page + 1 <= Math.ceil((store.getters.product?.total ?? 0) / form.limit)
                  ? form.page + 1
                  : form.page
            "
          >
            <div class="caret-next">
              <IconCarret color="#959595" />
            </div>
          </div>
        </div>
      </div></div
  ></AppLayout>
</template>
<style scoped>
.caret-prev {
  transform: rotate(90deg);
}
.caret-next {
  transform: rotate(270deg);
}
.pagination {
  display: flex;
  height: fit-content;
  width: fit-content;
  margin: 55px auto 78px;
}
.page-button {
  cursor: pointer;
  width: 53px;
  height: 52px;
  background: #ffffff;
  border: 1px solid #dfdfdf;
  justify-content: center;
  display: flex;
  align-items: center;

  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 23px;

  color: #888888;
}
.item-price {
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 17px;
  text-align: center;

  color: #eb3f36;
  margin: 10px 0px 20px;
}
.item-group-star {
  width: fit-content;
  margin: 10px auto 0px;
}
.item-seller {
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 15px;
  text-align: center;

  color: #696969;
  width: calc(100% - 47px);
  margin: 10px 23px 0px 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
.item-title {
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 19px;
  text-align: center;

  color: #696969;
  width: calc(100% - 47px);
  margin: 21px 23px 0px 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
.item-image {
  height: auto;
  width: calc(100% - 28px);
  object-fit: cover;
  margin: 15px 10px 0px 18px;
}
.list-item {
  width: calc(96% / 3);
  box-sizing: border-box;

  background: #ffffff;
  border: 1px solid #ececec;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.13);
  border-radius: 4px;
  text-decoration: none;
}
.list-content {
  width: 1016px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.filterbar {
  width: 338px;
}
.content {
  display: flex;
  gap: 18px;
  width: fit-content;
  margin: 0px auto;
}
.main-content {
  width: fit-content;
}
.action-content {
  display: flex;
}
.limit-selection {
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  text-align: center;

  color: #696969;
}
.select-limit {
  background: rgba(248, 248, 248, 0.75);
  border: 1px solid #f2f2f2;
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  text-align: center;

  color: #696969;
  padding: 8px 7px 7px 6px;
}
.order-selection {
  width: fit-content;
  margin-left: auto;
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  text-align: center;

  color: #696969;
}
.select-order {
  background: rgba(248, 248, 248, 0.75);
  border: 1px solid #f2f2f2;
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  text-align: center;

  color: #696969;
  padding: 8px 7px 7px 6px;
}
</style>
