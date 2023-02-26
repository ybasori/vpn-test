<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import NavBar from '@/components/molecules/NavBar/NavBar.vue'
import MenuBar from '@/components/molecules/MenuBar/MenuBar.vue'
import BreadCrumb from '@/components/atoms/BreadCrumb/BreadCrumb.vue'
import AppLayout from '@/components/atoms/AppLayout/AppLayout.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconHeart from '@/components/icons/IconHeart.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()
const form = ref({ limit: 10, order: ['product_name', 'ASC'], page: 1 })
const displayImage = ref<{ image_url: string } | null>(null)
function onFilter(
  list: {
    slug: string
    name: string
    short_description: string
    description: string
    price: number
    images: { image_url: string }[]
  }[]
) {
  return list.filter((item: { slug: string }) => item.slug === route.params.slug)
}

onMounted(() => {
  if (store.getters.auth === null) {
    router.push('/login')
  }
  store.dispatch('setFilterProduct', {
    keyword: '',
    limit: 10,
    price: [50000, 2000000],
    order: ['product_name', 'ASC'],
    page: 1
  })
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
watch(
  () => store.getters.product,
  () => {
    displayImage.value = onFilter(store.getters.product?.list ?? [])?.[0].images[0]
  }
)
</script>

<template>
  <AppLayout>
    <NavBar />
    <MenuBar />
    <template v-for="(item, i) in onFilter(store.getters.product?.list ?? [])" v-bind:key="i">
      <div :style="{ 'margin-top': '24px', 'margin-left': '70px' }">
        <BreadCrumb :path="'Home/' + item.name" />
      </div>
      <div class="content">
        <div class="description-inner">
          <div class="display-images">
            <img
              v-if="displayImage !== null"
              class="main-display-image"
              :src="displayImage.image_url"
              loading="lazy"
            />
            <div class="list-image">
              <template v-for="(image, j) in item.images" v-bind:key="j">
                <img
                  class="item-image"
                  :src="image.image_url"
                  loading="lazy"
                  @click="displayImage = image"
                />
              </template>
            </div>
          </div>
          <div class="description-container">
            <div class="description-title">
              {{ item.name }}
            </div>
            <div class="description-seller">
              {{ item.short_description }}
            </div>
            <div class="description-group-star">
              <IconStar />
              <IconStar />
              <IconStar />
              <IconStar />
              <IconStar />
            </div>
            <div class="description-price">Rp {{ item.price.toLocaleString('id') }}</div>
            <div class="description-action">
              <div class="description-quantity">
                <div class="quantity-button">-</div>
                <div class="quantity-total">1</div>
                <div class="quantity-button">+</div>
              </div>
              <div class="description-add-cart">TAMBAH KE KERANJANG</div>
              <div class="description-like">
                <IconHeart color="#EB3F36" />
              </div>
            </div>
            <div class="description-text">
              {{ item.short_description }}
            </div>
          </div>
        </div>
        <div class="description-tab">
          <div class="description-tab-title active">DESKRIPSI</div>
          <div class="description-tab-title">INFORMASI</div>
        </div>
        <div class="description-content">
          {{ item.description }}
        </div>
        <div class="description-recommended">
          <div class="description-recommended-title">
            REKOMENDASI UNTUK ANDA
            <div class="description-recommended-decor"></div>
          </div>
          <div class="description-recommended-items">
            <template
              v-for="(item, l) in store.getters.product?.list.filter((_:unknown, m:number) => m <= 2)"
              v-bind:key="l"
            >
              <RouterLink :to="'/' + item.slug" class="list-item">
                <template
                  v-for="(image, k) in item.images.filter((_:unknown, m:number) => m === 0)"
                  v-bind:key="k"
                >
                  <img :src="image.image_url" class="item-image-recommended" loading="lazy" />
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
        </div>
      </div>
    </template>
  </AppLayout>
</template>
<style scoped>
.description-recommended-items {
  display: flex;
  gap: 45px;
  margin: 53px auto 0px;
  max-width: 100%;
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
img.item-image-recommended {
  height: 300px;
  width: 300px;
  object-fit: cover;
  margin: 15px auto 0px auto;
  display: flex;
}
.list-item {
  width: calc(100% / 3 - 30px);
  box-sizing: border-box;

  background: #ffffff;
  border: 1px solid #ececec;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.13);
  border-radius: 4px;
  text-decoration: none;
}
.description-recommended-decor {
  width: 131px;
  height: 4px;

  background: #eb3f36;
  border-radius: 9px;
  margin: 17px auto 0px;
}
.description-recommended-title {
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 21px;
  text-align: center;

  color: #696969;
  margin: 48px auto 0px;
}
.description-recommended {
  width: 1216px;
  margin: 0px auto 156px;
}
.description-content {
  width: 1216px;
  margin: auto;
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 17px;

  color: #696969;
}
.description-tab {
  display: flex;
  width: fit-content;
  margin: 71px auto 26px;
}
.content {
  display: flex;
  flex-direction: column;
}
.description-tab-title.active {
  color: #eb3f36;
  border-bottom: 4px solid #eb3f36;
}
.description-tab-title {
  padding: 18px 0px;
  width: 300px;
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 21px;
  /* identical to box height */

  text-align: center;

  color: #bebebe;
}
.description-text {
  margin-top: 28px;
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 17px;

  color: #696969;
}
.description-like {
  width: 53px;
  height: 53px;

  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.description-add-cart {
  padding: 21px 21px 17px 20px;

  background: #eb3f36;

  font-family: 'Gotham';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 15px;

  color: #ffffff;
}
.description-action {
  display: flex;
  gap: 19px;
}
.description-quantity {
  display: flex;
  gap: 5px;
}
.quantity-total {
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #f1f1f1;
  color: #979797;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 53px;
}
.quantity-button {
  box-sizing: border-box;
  width: 58px;
  height: 53px;
  background: #ffffff;
  border: 1px solid #f1f1f1;
  color: #979797;
  display: flex;
  align-items: center;
  justify-content: center;
}
.description-price {
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 17px;

  color: #eb3f36;
  margin: 10px 0px 20px;
}
.description-group-star {
  width: fit-content;
}
.description-seller {
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 21px;

  color: #696969;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.description-title {
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 23px;
  letter-spacing: 0.05em;

  color: #696969;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.description-inner {
  display: flex;
  gap: 61px;
  width: fit-content;
  margin: 0px auto;
}
.main-display-image {
  width: 560px;
  height: 530px;
  object-fit: cover;
}
.list-image {
  display: flex;
  gap: 7px;
}
.item-image {
  width: 181px;
  height: 169px;
  object-fit: cover;
}
.description-container {
  width: 617px;
}
</style>
