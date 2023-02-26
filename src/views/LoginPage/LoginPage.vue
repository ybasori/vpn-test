<script setup lang="ts">
import ButtonPrimary from '@/components/atoms/ButtonPrimary/ButtonPrimary.vue'
import InputText from '@/components/atoms/InputText/InputText.vue'
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

interface IForm {
  email: string
  password: string
}
const store = useStore()
const router = useRouter()
const form = ref<IForm>({
  email: '',
  password: ''
})

function onSubmit() {
  let errorStr = ''
  const labels = {
    email: 'Email',
    password: 'Password'
  }
  Object.keys(form.value).map((key) => {
    if (errorStr === '' && form.value[key as keyof IForm] === '') {
      errorStr = `${labels[key as keyof IForm]} harus diisi`
    }
  })

  if (errorStr !== '') {
    alert(errorStr)
  } else {
    store.dispatch('postAuth', form.value)
  }
}

watch(
  () => store.getters.auth,
  (newData) => {
    if (newData !== null) {
      router.push('/')
    }
  }
)

onMounted(() => {
  if (store.getters.auth) {
    router.push('/')
  }
})
</script>

<template>
  <div class="login-page">
    <div class="card">
      <div class="card-title">Masuk</div>
      <form class="form" @submit.prevent="onSubmit">
        <div class="row">
          <InputText placeholder="Email" type="text" v-model:value="form.email" />
        </div>
        <div class="row">
          <InputText placeholder="Password" type="password" v-model:value="form.password" />
        </div>
        <div class="forget-password">Lupa password?</div>
        <div class="row">
          <ButtonPrimary type="submit">MASUK</ButtonPrimary>
        </div>
        <div class="row">
          <div class="line"></div>
        </div>
        <div class="row">
          <div class="register">
            Belum punya akun? <RouterLink to="/register">Daftar Sekarang</RouterLink>
          </div>
        </div>
      </form>
    </div>
    <!-- <button @click="increment">Count is: {{ count }}</button> -->
  </div>
</template>
<style scoped>
.login-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  width: 568px;

  background: #ffffff;
  box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 42px 34px;
}

.card-title {
  width: 100%;

  font-family: 'Gotham';
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 25px;
  letter-spacing: 0.04em;

  color: #730c07;
}
.form {
  display: flex;
  flex-direction: column;
  padding-top: 11px;
}
.row {
  margin-top: 25px;
  text-align: center;
  width: 100%;
  font-family: Gotham;
  color: #7c7c7c;
}
a {
  color: #730c07;
  font-weight: bold;
  text-decoration: none;
}
.forget-password {
  margin-top: 20px;
  margin-left: auto;
  margin-bottom: 5px;
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #730c07;
}
.line {
  max-width: 100%;
  height: 1px;
  background: #c2c2c2;
  margin: 10px 37px 0px;
}
.register {
  margin-bottom: 21px;
}
</style>
