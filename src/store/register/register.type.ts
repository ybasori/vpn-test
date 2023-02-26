export type IRegister = {
  created_at: string
  email: string
  id: number
  name: string
  phone: string
  updated_at: string
}

export interface IRegisterState {
  isLoadingRegister: boolean
  errorRegister: unknown
  register: IRegister | null
}
