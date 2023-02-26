import type { ICommit } from '../store.type'
import type { IAuth, IAuthState } from './auth.type'
import axios from 'axios'

const state = () => ({
  isLoadingAuth: false,
  errorAuth: null,
  auth: null
})

const mutations = {
  loadingAuth(state: IAuthState) {
    state.isLoadingAuth = true
  },
  successAuth(state: IAuthState, payload: IAuth) {
    state.isLoadingAuth = false
    state.auth = payload
  },
  errorAuth(state: IAuthState, payload: unknown) {
    state.isLoadingAuth = false
    state.errorAuth = payload
  }
}
const actions = {
  async postAuth({ commit }: { commit: ICommit }, payload: IAuth) {
    try {
      commit('loadingAuth')
      const result = await axios.post('https://techtest.folkatech.com/api/login', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      localStorage.setItem('auth', JSON.stringify(result.data.data))

      commit('successAuth', result.data.data)
    } catch (err) {
      commit('errorAuth', err)
    }
  },
  loadAuth({ commit }: { commit: ICommit }) {
    const storage = JSON.parse(localStorage.getItem('auth') ?? 'undefined')
    if (storage) {
      commit('successAuth', storage)
    }
  }
}
const getters = {
  auth(state: IAuthState) {
    return state.auth
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
