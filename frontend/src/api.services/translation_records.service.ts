import axios from "axios"

import { 
  TranslationRecordsListItemSchema, 
  TranslationRecordGetSchema, 
  DeleteRecordItemRequestSchema,
  DeleteTranslationRecordRequestSchema
 } from "../schemas/translation_record.schema"

const baseURL: string = import.meta.env.VITE_BACKEND_API_URL as string

class TranslationRecordsService {
  async getTranslationRecordsAll() {
    try {
      const res = await axios.get(`${baseURL}/all-translation-records`)
      console.log("The response data of getOpenRecords(): ", res.data)

      return res.data as TranslationRecordsListItemSchema[]
    } catch (e) {
      console.error(e)
    }
  }

  async openRecordOfTranslationID(translation_id: string) {
    try {
      const res = await axios.post(
        `${baseURL}/open-record-of-translation_id`,
        translation_id
      )
      console.log("The response data of openRecordOfTranslationID(): ", res.data)

      return res.data as TranslationRecordGetSchema
    } catch (e) {
      console.error(e)
    }
  }

  async deleteTranslationRecord(deleteTranslationRecordRequest: DeleteTranslationRecordRequestSchema) {
    try {
      const res = await axios.post(
        `${baseURL}/delete-translation-record`,
        deleteTranslationRecordRequest
      )
      console.log("The response data of deleteTranslationRecord(): ", res.data)

      return res.data
    } catch (e) {
      console.error(e)
    }
  }

  async deleteRecordItem(deleteRecordItemRequest: DeleteRecordItemRequestSchema) {
    try {
      const res = await axios.post(
        `${baseURL}/delete-item-in-translation-record`,
        deleteRecordItemRequest
      )
      console.log("The response data of deleteRecordItem(): ", res.data)

      return res.data
    } catch (e) {
      console.error(e)
    }
  }

}

export default new TranslationRecordsService()
