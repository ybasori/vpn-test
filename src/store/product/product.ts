import type { ICommit, IStore } from '../store.type'
import type { IProductState, IProduct, IProductParams } from './product.type'
import axios from 'axios'

const state = () => ({
  isLoadingProduct: false,
  errorProduct: null,
  product: null,
  filterProduct: {
    keyword: '',
    price: [10000, 250000],
    page: 1,
    limit: 10,
    order: ['product_name', 'ASC']
  }
})

const mutations = {
  loadingProduct(state: IProductState) {
    state.isLoadingProduct = true
  },
  successProduct(state: IProductState, payload: IProduct) {
    state.isLoadingProduct = false
    state.product = payload
  },
  errorProduct(state: IProductState, payload: unknown) {
    state.isLoadingProduct = false
    state.errorProduct = payload
  },
  resetProduct(state: IProductState) {
    state.isLoadingProduct = false
    state.errorProduct = null
    state.product = null
  },
  filterProduct(state: IProductState, payload: unknown) {
    state.filterProduct = payload as IProductParams
  }
}
const actions = {
  async getProduct({ commit, rootGetters }: { commit: ICommit; rootGetters: IStore }) {
    try {
      commit('loadingProduct')
      const params = Object.keys(rootGetters.filterProduct)
        .map((key) => {
          return `${key}=${
            Array.isArray(rootGetters.filterProduct[key as keyof typeof rootGetters.filterProduct])
              ? (
                  rootGetters.filterProduct[key as keyof typeof rootGetters.filterProduct] as
                    | string[]
                    | number[]
                ).join(',')
              : rootGetters.filterProduct[key as keyof typeof rootGetters.filterProduct]
          }`
        })
        .join('&')
      const result = await axios.get(`https://techtest.folkatech.com/api/product?${params}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${rootGetters.auth.token}`
        }
      })

      commit('successProduct', result.data.data)
    } catch (err) {
      commit('errorProduct', err)
    }
  },
  setFilterProduct(
    { commit, rootGetters }: { commit: ICommit; rootGetters: IStore },
    payload: { [key: string]: string }
  ) {
    commit('filterProduct', { ...rootGetters.filterProduct, ...payload })
  }
}
const getters = {
  product(state: IProductState) {
    return state.product
  },
  filterProduct(state: IProductState) {
    return state.filterProduct
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
