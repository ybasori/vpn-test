<script setup lang="ts">
import ButtonPrimary from '@/components/atoms/ButtonPrimary/ButtonPrimary.vue'
import { RouterLink, useRouter } from 'vue-router'
import InputText from '@/components/atoms/InputText/InputText.vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

interface IForm {
  firstname: string
  lastname: string
  email: string
  phone: string
  password: string
  passwordConfirmation: string
}

const store = useStore()
const router = useRouter()

const form = ref<IForm>({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirmation: ''
})
const isNext = ref(false)

function onSubmit() {
  let errorStr = ''
  const labels = {
    firstname: 'Nama Depan',
    lastname: 'Nama Belakang',
    email: 'Email',
    phone: 'Nomor Telepon',
    password: 'Password',
    passwordConfirmation: 'Konfirmasi Password'
  }
  Object.keys(form.value).map((key) => {
    if (errorStr === '' && form.value[key as keyof IForm] === '') {
      errorStr = `${labels[key as keyof IForm]} harus diisi`
    }
  })

  if (errorStr === '' && form.value.password !== form.value.passwordConfirmation) {
    errorStr = `Konfirmasi Password tidak sama dengan Password`
  }
  if (errorStr !== '') {
    alert(errorStr)
  } else {
    let dt = JSON.parse(JSON.stringify(form.value))
    dt = { ...dt, name: `${dt.firstname} ${dt.lastname}` }
    delete dt.firstname
    delete dt.lastname
    delete dt.passwordConfirmation

    store.dispatch('postRegister', dt)
  }
}

watch(
  () => store.getters.register,
  (newData) => {
    if (newData !== null) {
      form.value = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        passwordConfirmation: ''
      }
      store.commit('resetRegister')
      alert('Dafter berhasil')
      router.push('/login')
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
  <div class="register-page">
    <div class="card">
      <div v-if="!isNext" class="card-title">Daftar Sekarang</div>
      <div v-if="isNext" class="card-title" @click="isNext = false"><IconArrow /> Kembali</div>
      <form class="form" @submit.prevent="onSubmit">
        <template v-if="!isNext">
          <div class="row">
            <InputText placeholder="Nama Depan" type="text" v-model:value="form.firstname" />
          </div>
          <div class="row">
            <InputText placeholder="Nama Belakang" type="text" v-model:value="form.lastname" />
          </div>
          <div class="row">
            <InputText placeholder="Email" type="text" v-model:value="form.email" />
          </div>
          <div class="row">
            <ButtonPrimary type="button" @click="isNext = true">SELANJUTNYA</ButtonPrimary>
          </div>
        </template>
        <template v-if="isNext">
          <div class="row">
            <InputText placeholder="Nomor Telepon" type="text" v-model:value="form.phone" />
          </div>
          <div class="row">
            <InputText placeholder="Password" type="password" v-model:value="form.password" />
          </div>
          <div class="row">
            <InputText
              placeholder="Konfirmasi Password"
              type="password"
              v-model:value="form.passwordConfirmation"
            />
          </div>
          <div class="row">
            <ButtonPrimary type="submit">SELANJUTNYA</ButtonPrimary>
          </div>
        </template>
        <div class="row">
          <div class="line"></div>
        </div>
        <div class="row">
          <div class="register">Sudah punya akun? <RouterLink to="/login">Masuk</RouterLink></div>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.register-page {
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
