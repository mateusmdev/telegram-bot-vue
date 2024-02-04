import { jwtDecode } from "jwt-decode"

export default function verifyLogin(){
    const token = localStorage.getItem('token-bot')

    if (!token || token === ''){
        return false
    }

    try {
        const decodedToken = jwtDecode(token)
        const expirationDate = new Date(decodedToken.exp * 1000)
        const currentDate = new Date()

        if (currentDate > expirationDate){
            localStorage.removeItem('token-bot')
            return false
        }

        return true

    } catch (error) {
        localStorage.removeItem('token-bot')
        return false
    }
}
