import type { IAuth } from './auth/auth.type'
import type { IProduct, IProductParams } from './product/product.type'
import type { IRegister } from './register/register.type'

export type ICommit = (mutation: string, payload?: unknown) => void
export interface IStore {
  auth: IAuth
  register: IRegister
  product: IProduct
  filterProduct: IProductParams
}
