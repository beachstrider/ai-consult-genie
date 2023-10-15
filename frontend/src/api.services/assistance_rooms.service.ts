import axios from "axios"

import { 
  AssistanceRoomListItemSchema, 
  AssistanceRoomGetSchema,
  DeleteAssistanceRoomRequestSchema,
  DeleteAssistanceRoomMessageRequestSchema
 } from "../schemas/assiatant_room.schema"

const baseURL: string = import.meta.env.VITE_BACKEND_API_URL as string

class AssistanceRoomsService {
  async getAllOpenRooms() {
    try {
      const res = await axios.get(`${baseURL}/all-open-rooms`)
      console.log("The response data of getOpenRooms(): ", res.data)

      return res.data as AssistanceRoomListItemSchema[]
    } catch (e) {
      console.error(e)
    }
  }

  async openRoomOfAssistantUUID(assistant_uuid: string) {
    try {
      const res = await axios.post(
        `${baseURL}/open-room-of-assistant_uuid`,
        assistant_uuid
      )
      console.log("The response data of getAssistantRoom(): ", res.data)

      return res.data as AssistanceRoomGetSchema
    } catch (e) {
      console.error(e)
    }
  }

  async deleteAssistanceRoom(deleteAssistantRoomRequest: DeleteAssistanceRoomRequestSchema) {
    try {
      const res = await axios.post(
        `${baseURL}/delete-assistant-room_uuid`,
        deleteAssistantRoomRequest
      )
      console.log("The response data of deleteTranslationRecord(): ", res.data)

      return res.data
    } catch (e) {
      console.error(e)
    }
  }

  async deleteAssistanceRoomMessage(deleteAssistanceRoomMessageRequest: DeleteAssistanceRoomMessageRequestSchema) {
    try {
      const res = await axios.post(
        `${baseURL}/delete-message-in-assistant-room`,
        deleteAssistanceRoomMessageRequest
      )
      console.log("The response data of deleteRecordItem(): ", res.data)

      return res.data
    } catch (e) {
      console.error(e)
    }
  }
}

export default new AssistanceRoomsService()
