/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from "axios"


const baseURL: string = import.meta.env.VITE_BACKEND_API_URL as string


export interface AssistanceRequestBodySchema {
  room_uuid: string | undefined
  msg_text: string
}  

class AssistantService {
  async sendTextMsg_receiveTextResponse(assistantRequestBody: AssistanceRequestBodySchema) {
    try {
      const res = await axios.post(
        `${baseURL}/assistant_responds/on_text_as_text`,
        assistantRequestBody
      )
      console.log(
        "The response data of sendTextMsg_receiveTextResponse(): ",
        res.data
      )

      return res.data
    } catch (e) {
      console.error(e)
    }
  }

}

export default new AssistantService()
