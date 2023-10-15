import axios from 'axios'
import { 
  // UserSchema,
  UserLoginSchema,
  UserRegisterSchema,
} from '../schemas/user.schema'

const baseURL = import.meta.env.VITE_BACKEND_API_URL;

class AuthService {
  async register(registerData: UserRegisterSchema) {
    const response = await axios.post(baseURL + '/register', registerData)
    return response.data
  }

  async login(loginData: UserLoginSchema) {
    const response = await axios.post(baseURL + '/login/access-token', loginData)
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token)
    }
    console.log("Token: ", response.data.access_token)
    return response.data
  }

  async refreshToken() {
    const response = await axios.get(baseURL + '/login/refresh-token', { withCredentials: true })
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token)
    }
    return response.data
  }

  async logout() {
    console.log("Removing Token ...")
    localStorage.removeItem('token')
    console.log("Token: ", localStorage.getItem("token"));
    console.log("Removed Token !")
  }

  getGoogleLoginUrl() {
    return baseURL + '/login/google'
  }

  getFacebookLoginUrl() {
    return baseURL + '/login/facebook'
  }
}

export default new AuthService()
