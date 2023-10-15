export interface UserSchema {
  uuid: string
  email: string
  password?: string
  first_name?: string
  last_name?: string
  avatar?: string
  provider?: string
  is_active?: boolean
  is_manager?: boolean
  is_developer?: boolean
}

export interface UserLoginSchema {
  email: string
  password: string
}

export interface UserRegisterSchema {
  first_name?: string
  last_name?: string
  email: string
  password: string

}
