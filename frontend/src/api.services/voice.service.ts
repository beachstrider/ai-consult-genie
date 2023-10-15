/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from "axios"

// import { TranslationRecordSchema } from "../schemas/translation_record.schema"

const baseURL: string = import.meta.env.VITE_BACKEND_API_URL as string


export interface STTRequestBodySchema {
  audio_base64: any
  language_code: string
}  


export interface TTSRequestBodySchema {
  text: string
  voice: string | undefined
}  


class VoiceService {
  async sendSpeech_receiveTranscription(stt_requestBody: STTRequestBodySchema) {
    try {
      const res = await axios.post(
        `${baseURL}/voice_service/stt`, 
        stt_requestBody
      )
      console.log(
        "The response data of sendAudio_receiveTranscription(): ",
        res.data
      )

      return res.data
    } catch (e) {
      console.error(e)
    }
  }

  async sendText_receiveSpeech(tts_requestBody: TTSRequestBodySchema) {
    try {
      const res = await axios.post(
        `${baseURL}/voice_service/tts`,
        tts_requestBody
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

export default new VoiceService()
