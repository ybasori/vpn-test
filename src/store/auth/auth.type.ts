export type IAuth = {
  created_at: string
  email: string
  id: number
  name: string
  phone_number: string
  token: string
  updated_at: string
}

export interface IAuthState {
  isLoadingAuth: boolean
  errorAuth: unknown
  auth: IAuth | null
}
