import axios from "axios"
import { UserSchema } from "../schemas/user.schema"

const baseURL = import.meta.env.VITE_BACKEND_API_URL

class ManagerService {
  async updateUser(userId: string, profile: UserSchema): Promise<UserSchema> {
    const response = await axios.patch(`${baseURL}/users/${userId}`, profile)
    return response.data
  }

  async getUsers(): Promise<Array<UserSchema>> {
    const response = await axios.get(`${baseURL}/users`)
    return response.data
  }

  async deleteUser(userId: string) {
    const response = await axios.delete(`${baseURL}/users/${userId}`)
    return response.data
  }

}

export default new ManagerService()
