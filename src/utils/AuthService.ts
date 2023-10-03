export const AuthLogin = (data: Models.LoginResponseModel) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
}

export const AuthLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

export const GetUser = (): {
    id: number
    rut: string
    email: string
    name: string
    lastname: string
    password: string
    cargo: string
    phone: string
    role: string
    thumbnail: string | null
    active: boolean
    deleted: boolean
    createdAt: string
    companyId: number
  } | null => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
}