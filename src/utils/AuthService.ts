export const AuthLogin = (data: Models.LoginResponseModel) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
}

export const AuthLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}