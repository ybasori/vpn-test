import type { ICommit } from '../store.type'
import type { IRegister, IRegisterState } from './register.type'
import axios from 'axios'

const state = () => ({
  isLoadingRegister: false,
  errorRegister: null,
  register: null
})

const mutations = {
  loadingRegister(state: IRegisterState) {
    state.isLoadingRegister = true
  },
  successRegister(state: IRegisterState, payload: IRegister) {
    state.isLoadingRegister = false
    state.register = payload
  },
  errorRegister(state: IRegisterState, payload: unknown) {
    state.isLoadingRegister = false
    state.errorRegister = payload
  },
  resetRegister(state: IRegisterState) {
    state.isLoadingRegister = false
    state.errorRegister = null
    state.register = null
  }
}
const actions = {
  async postRegister({ commit }: { commit: ICommit }, payload: IRegister) {
    try {
      commit('loadingRegister')
      const result = await axios.post('https://techtest.folkatech.com/api/register', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      commit('successRegister', result.data)
    } catch (err) {
      commit('errorRegister', err)
    }
  }
}
const getters = {
  register(state: IRegisterState) {
    return state.register
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
