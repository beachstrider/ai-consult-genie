import React from "react"
import { useState } from "react"
import { useReactMediaRecorder } from "react-media-recorder"
import { Tooltip as ReactTooltip } from "react-tooltip"
import { toast } from "react-toastify"

import { MicrophoneIcon } from "@heroicons/react/24/solid"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"

import { useAuth } from "../../contexts/auth"
import voiceService from "../../api.services/voice.service"
import { STTRequestBodySchema } from "../../api.services/voice.service"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  handleMsgSend: any
  // handleMicStop: any;

  assistant_display_name: string
  isAnswering: any

  allowMic: any
  isAudioDirectly: any
}

/////////////////////////////////////////////////////////////////////////////////////
export default function AudioTextSend(props: Props) {
  const { currentUser } = useAuth()
  const [msgText, setMsgText] = useState("")
  const [isTranscribing, setIsTranscribing] = useState(false)

  // const scrollRef = useRef();

  const handleFormSubmit = async (e: any) => {
    e.preventDefault()

    props.handleMsgSend(msgText)
    setMsgText("")
  }

  // const handleMicStart = async () => {
  //   setMsgText("")
  //   console.log("*** Handling the mic start ... ***")
  // }

  const handleMicStop = async (blobUrl: string) => {
    console.log("*** Handling the mic stop ... ***")
    setIsTranscribing(true)

    // convert blob url to blob object
    if (currentUser !== undefined) {
      void fetch(blobUrl)
        .then((res) => res.blob())
        .then(async (blob) => {
          var reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = function () {
            var base64String = reader.result
            // console.log("Blob - ", blob)
            // console.log("Base64 String - ", base64String)

            const stt_requestBody: STTRequestBodySchema = {
              audio_base64: base64String,
              language_code: "",
            }

            // send form data to audio transcription api endpoint
            voiceService
              .sendSpeech_receiveTranscription(stt_requestBody)
              .then((res: any) => {
                // set message text as the transcription text
                setIsTranscribing(false)
                if (!props.isAudioDirectly) {
                  setMsgText(res?.transcription)
                } else {
                  props.handleMsgSend(res.transcription)
                  setMsgText("")
                }
              })
              .catch((err: any) => {
                console.error(err)
                setIsTranscribing(false)
              })
          }
        })
    } else {
      setTimeout(() => {
        toast("You are not logged-in, so the voice service does not work.")
        setIsTranscribing(false)
      }, 1000)
    }
  }

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl = "",
  } = useReactMediaRecorder({
    audio: true,
  })

  React.useEffect(() => {
    if (mediaBlobUrl) {
      handleMicStop(mediaBlobUrl)
    }
  }, [mediaBlobUrl])

  return (
    <>
      {(status == "recording" || isTranscribing || props.isAnswering) && (
        <span
          className={classNames(
            status == "recording"
              ? "text-red-600"
              : isTranscribing == true
              ? "text-blue-600"
              : props.isAnswering == true
              ? "text-yellow-600"
              : "",
            " pl-6 text-xs"
          )}
        >
          {status === "recording"
            ? `Your speech is being recorded ...`
            : isTranscribing === true
            ? props.isAudioDirectly
              ? props.assistant_display_name + ` is listening your speech ...`
              : `Your speech is being transcribed ...`
            : props.isAnswering == true
            ? props.assistant_display_name + ` is responding ...`
            : ``}
        </span>
      )}

      <div className="flex justify-between items-stretch px-2 py-3 bg-transparent h-18 gap-1">
        {/* Microphone button */}
        {props.allowMic && (
          <button
            id="mic-button"
            disabled={isTranscribing || props.isAnswering}
            className={classNames(
              props.isAudioDirectly ? "w-full" : "w-10",
              status == "recording"
                ? "bg-red-600 ring-transparent text-white"
                : isTranscribing || props.isAnswering
                ? "bg-gray-600 ring-transparent text-gray-600"
                : "bg-gray-200 dark:bg-gray-800 ring-transparent text-gray-600 dark:text-white",
              // :   "bg-[#486CF6] dark:bg-blue-950  ring-transparent text-white",
              "cursor-pointer h-12 w-12 rounded-full flex items-center justify-center"
            )}
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            data-tooltip-id="mic-btn"
          >
            <MicrophoneIcon className="h-6 w-6 rounded-full" />
          </button>
        )}

        {(!props.allowMic || !props.isAudioDirectly) && (
          <form onSubmit={handleFormSubmit} className="flex gap-1 grow">
            {/* Text input */}
            <input
              id="text-input"
              type="text"
              disabled={
                status == "recording" || isTranscribing || props.isAnswering
              }
              placeholder={
                status == "recording" || isTranscribing || props.isAnswering
                  ? ""
                  : `Type a message ...`
              }
              className={classNames(
                status == "recording" || isTranscribing || props.isAnswering
                  ? "bg-gray-600 dark:text-gray-600"
                  : "bg-gray-200 dark:bg-gray-800 dark:text-white ",
                // :   "bg-[#486CF6] dark:bg-blue-950  ring-transparent text-white",
                "flex-1 pl-4 outline-none text-sm text-gray-600 rounded-full placeholder-gray-400 h-12 border-none w-full"
              )}
              name="message"
              required
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
            />

            {/* Send button */}
            <button
              id="send-button"
              type="submit"
              disabled={
                status == "recording" || isTranscribing || props.isAnswering
              }
              className={classNames(
                status == "recording" || isTranscribing || props.isAnswering
                  ? "bg-gray-600  dark:text-gray-600"
                  : "bg-gray-200 dark:bg-gray-800 dark:text-white  ",
                // : "bg-[#486CF6] dark:bg-blue-950  ring-transparent text-white",
                "h-12 w-12 flex items-center justify-center rounded-full text-gray-600"
              )}
              data-tooltip-id="send-btn"
            >
              <PaperAirplaneIcon
                className="h-6 w-6 "
                // aria-hidden="true"
              />
            </button>

            <ReactTooltip
              id="mic-btn"
              place="right"
              content={
                status == "recording" || isTranscribing || props.isAnswering
                  ? ""
                  : "Record with mouse-down and stop recording with mouse-up"
              }
            />
            <ReactTooltip
              id="send-btn"
              place="left"
              content={
                status == "recording" || isTranscribing || props.isAnswering
                  ? ""
                  : "Send message text"
              }
            />
          </form>
        )}
      </div>
    </>
  )
}
