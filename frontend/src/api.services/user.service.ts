import axios from "axios"
import { UserSchema } from "../schemas/user.schema"

const baseURL = import.meta.env.VITE_BACKEND_API_URL

class UserService {
  async getProfile(): Promise<UserSchema> {
    const response = await axios.get(`${baseURL}/read_me`)
    console.log("The response data of getProfile(): ", response.data);

    return response.data
  }

  async updateProfile(profile: UserSchema): Promise<UserSchema> {
    const response = await axios.patch(`${baseURL}/update_me`, profile)
    return response.data
  }

  async getUsers(): Promise<Array<UserSchema>> {
    const response = await axios.get(`${baseURL}/users`)
    return response.data
  }

  async deleteSelf() {
    const response = await axios.delete(`${baseURL}/delete_me`)
    return response.data
  }
}

export default new UserService()
