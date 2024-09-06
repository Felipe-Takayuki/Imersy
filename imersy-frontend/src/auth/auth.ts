
export function isAuth() {
    const token = localStorage.getItem("token")
    return !!token
}

export function getToken() {
    return localStorage.getItem("token")
}

export function setToken(token:string) {
    return localStorage.setItem("token", token)
}

export function logOut() {
    localStorage.removeItem("token")
    location.reload()
}