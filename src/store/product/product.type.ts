interface IProductItem {
  id: number
}
export interface IProductParams {
  keyword: string
  price: number[]
  page: number
  limit: number
  order: string[]
}

export interface IProduct {
  list: IProductItem[]
  total: number
}

export interface IProductState {
  isLoadingProduct: boolean
  errorProduct: unknown
  product: IProduct | null
  filterProduct: IProductParams
}
