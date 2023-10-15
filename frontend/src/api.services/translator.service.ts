/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from "axios"
import { TranslationItemSchema } from "../schemas/translation_record.schema"

const baseURL: string = import.meta.env.VITE_BACKEND_API_URL as string

 
export interface TranslationRequestBodySchema {
  translation_record_uuid: string | undefined
  translation_record_item: TranslationItemSchema
}  


class TranslatorService {
  async sendTranslationRequest_receiveTranslationText(translationRequestBody: TranslationRequestBodySchema) {
    try {
      const res = await axios.post(
        `${baseURL}/translator_responds/on_request_as_translation_text`,
        translationRequestBody
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

export default new TranslatorService()
