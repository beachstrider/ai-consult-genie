// import React from "react"
import { useState, useEffect } from "react"
import { useReactMediaRecorder } from "react-media-recorder"
// import { Tooltip as ReactTooltip } from "react-tooltip"
import { toast } from "react-toastify"

import { MicrophoneIcon, StopIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"

import voiceService from "../../api.services/voice.service"
import { STTRequestBodySchema } from "../../api.services/voice.service"

import { useAuth } from "../../contexts/auth"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  handleTranslationRequestSend: any
  currentLanguage: any

  allowMic: any
  isAudioDirectly: any

  side: string
  currentSide: any
  setCurrentSide: any
  inputStatus: string
  setInputStatus: any

  inputboxcolor: string
}

/////////////////////////////////////////////////////////////////////////////////////
export default function AudioTextSend(props: Props) {
  const { currentUser } = useAuth()
  const [msgText, setMsgText] = useState("")
  // const [isTranscribing, setIsTranscribing] = useState(false)

  useEffect(() => {
    if (msgText !== "") {
      props.setCurrentSide(props.side)
      props.setInputStatus("typing")
    }
    if (msgText == "") {
      // props.setCurrentSide(props.side)
      props.setInputStatus("idle")
    }
  }, [msgText])

  const handleFormSubmit = async (e: any) => {
    e.preventDefault()

    props.setCurrentSide(props.side)

    await props.handleTranslationRequestSend(msgText)
    setMsgText("")
  }

  const cancelTyping = async () => {
    props.setInputStatus("idle")
    props.setCurrentSide(props.side)
    setMsgText("")

    console.log("*** Handling the cancel typing ... ***")
  }

  const handleMicStart = async () => {
    props.setInputStatus("recording")
    props.setCurrentSide(props.side)
    setMsgText("")

    console.log("*** Handling the mic start ... ***")
  }

  const handleMicStop = async (blobUrl: string) => {
    console.log("*** Handling the mic stop ... ***")
    props.setInputStatus("transcribing")
    setMsgText("")

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
              language_code: props.currentLanguage.code,
            }

            // send form data to audio transcription api endpoint
            voiceService
              .sendSpeech_receiveTranscription(stt_requestBody)
              .then((res: any) => {
                // set message text as the transcription text
                if (!props.isAudioDirectly) {
                  setMsgText(res?.transcription)
                  props.setInputStatus("idle")
                } else {
                  props.setInputStatus("answering")
                  props.handleTranslationRequestSend(res.transcription)
                  setMsgText("")
                  props.setInputStatus("idle")
                }
              })
              .catch((err: any) => {
                console.error(err)
                props.setInputStatus("idle")
              })
          }
        })
    } else {
      setTimeout(() => {
        toast("You are not logged-in, so the voice service does not work.")
        props.setInputStatus("idle")
      }, 2000)
    }
  }

  const {
    status,
    startRecording,
    stopRecording,
    // mediaBlobUrl = "",
  } = useReactMediaRecorder({
    audio: true,
    onStart: handleMicStart,
    onStop: handleMicStop,
  })

  // React.useEffect(() => {
  //   if (mediaBlobUrl) {
  //     handleMicStop(mediaBlobUrl)
  //   } else {
  //     handleMicStart()
  //   }
  // }, [mediaBlobUrl])

  // const scrollRef = useRef();
  useEffect(() => {
    if (status == "recording") {
      props.setCurrentSide(props.side)
      props.setInputStatus("recording")
    }
    if (msgText == "idle") {
      props.setCurrentSide(props.side)
      props.setInputStatus("idle")
    }
  }, [status])

  return (
    <>
      <div className="flex-1 justify-between items-stretch py-2 h-18 relative mx-1">
        {/* Microphone button */}
        {props.allowMic && (
          <button
            id="mic-button"
            disabled={
              props.inputStatus == "transcribing" ||
              props.inputStatus == "answering" ||
              (props.currentSide !== props.side && props.inputStatus !== "idle")
            }
            className={classNames(
              props.isAudioDirectly ? "w-full" : "w-12",
              props.inputStatus == "transcribing" ||
                props.inputStatus == "answering" ||
                (props.currentSide !== props.side &&
                  props.inputStatus !== "idle")
                ? "bg-gray-600 ring-transparent text-gray-600"
                : props.inputboxcolor == "blue"
                ? "bg-blue-600 dark:bg-blue-800  text-white"
                : props.inputboxcolor == "green"
                ? "bg-green-600 dark:bg-green-800 text-white"
                : "bg-gray-300 dark:bg-gray-700 text-white",
              "ring-transparent dark:text-white",
              "cursor-pointer h-12 rounded-full flex  gap-1 grow items-center justify-center absolute left-0"
            )}
            // onMouseDown={startRecording}
            // onMouseUp={stopRecording}
            onClick={
              props.inputStatus == "idle"
                ? startRecording
                : props.inputStatus == "recording"
                ? stopRecording
                : cancelTyping
            }
            data-tooltip-id="mic-btn"
          >
            {props.inputStatus == "idle" && (
              <MicrophoneIcon className="h-6 w-6 rounded-full" />
            )}
            {props.inputStatus == "recording" && (
              <StopIcon className="h-6 w-6 rounded-full" />
            )}
            {props.inputStatus == "typing" && (
              <XMarkIcon className="h-6 w-6 rounded-full" />
            )}
          </button>
        )}

        {/* {(!props.allowMic || !props.isAudioDirectly) && ( */}
        <form onSubmit={handleFormSubmit} className="flex">
          {/* Text input */}
          <input
            id="text-input"
            type="text"
            disabled={
              props.inputStatus == "recording" ||
              props.inputStatus == "transcribing" ||
              props.inputStatus == "answering" ||
              props.isAudioDirectly ||
              (props.currentSide !== props.side && props.inputStatus !== "idle")
            }
            placeholder={
              props.inputStatus == "recording" ||
              props.inputStatus == "transcribing" ||
              props.inputStatus == "answering" ||
              (props.currentSide !== props.side && props.inputStatus !== "idle")
                ? ""
                : `Type ...`
            }
            className={classNames(
              props.inputStatus == "recording" ||
                props.inputStatus == "transcribing" ||
                props.inputStatus == "answering" ||
                (props.currentSide !== props.side &&
                  props.inputStatus !== "idle")
                ? "bg-gray-600 dark:text-gray-600"
                : props.inputboxcolor == "blue"
                ? "bg-blue-500 dark:bg-blue-900  text-white"
                : props.inputboxcolor == "green"
                ? "bg-green-500 dark:bg-green-900 text-white"
                : "bg-gray-200 dark:bg-gray-800 dark:text-white ",
              // :   "bg-[#486CF6] dark:bg-blue-950  ring-transparent text-white",
              props.allowMic ? " pl-14" : "pl-5",
              "flex-1 pr-12 outline-none text-sm text-gray-600 rounded-full placeholder-gray-500 h-12 w-1/2 ring-0 border-0 focus:ring-0"
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
              props.inputStatus == "recording" ||
              props.inputStatus == "transcribing" ||
              props.inputStatus == "answering" ||
              msgText == "" ||
              (props.currentSide !== props.side && props.inputStatus !== "idle")
            }
            className={classNames(
              props.inputStatus == "recording" ||
                props.inputStatus == "transcribing" ||
                props.inputStatus == "answering" ||
                msgText == "" ||
                (props.currentSide !== props.side &&
                  props.inputStatus !== "idle")
                ? "hidden"
                : props.inputboxcolor == "blue"
                ? "bg-blue-600 dark:bg-blue-800  text-white"
                : props.inputboxcolor == "green"
                ? "bg-green-600 dark:bg-green-800 text-white"
                : "bg-gray-300 dark:bg-gray-700",
              // : "bg-[#486CF6] dark:bg-blue-950  ring-transparent text-white",
              "h-12 w-12 flex items-center justify-center rounded-full text-gray-600 absolute right-0"
            )}
            data-tooltip-id="send-btn"
          >
            <PaperAirplaneIcon
              className="h-6 w-6 "
              // aria-hidden="true"
            />
          </button>
        </form>
        {/* )} */}
      </div>
    </>
  )
}
