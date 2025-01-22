export type AuthUser = {
  id: number
  fullname: string
  email: string
  avatar: string
  createdAt: string
  updatedAt: string
}

export type Auth = {
  userId: number | null
  fullname: string
  email: string
  password: string
  isLoggedIn: boolean
  avatar?: string
  user?: AuthUser
}
