export interface  AssistanceRoomMessageSchema  {
  uuid?: string
  time_stamp: any

  sender_uuid: string | undefined
  text: string
}

export interface AssistanceRoomListItemSchema {
  uuid?: string
  assistant_uuid: string
  user_uuid?: string 
}  

export interface AssistanceRoomGetSchema {
  uuid?: string
  assistant_uuid: string
  user_uuid?: string 

  assistant_voice?: string
  messages: AssistanceRoomMessageSchema[]  
}  

export interface DeleteAssistanceRoomRequestSchema {
  assistance_room_uuid: string | undefined
}  

export interface DeleteAssistanceRoomMessageRequestSchema {
  assistance_room_uuid: string | undefined
  room_message_uuid: string | undefined  
}  
  
  