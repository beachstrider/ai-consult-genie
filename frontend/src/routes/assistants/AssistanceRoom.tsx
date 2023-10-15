import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { Tooltip as ReactTooltip } from "react-tooltip"

import {
  ArrowLeftIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline"

import WelcomeToAssistance from "./WelcomeToAssistance"
import AssistanceRoomHeader from "./AssistanceRoomHeader"
import ControlsDropdown from "./ControlsDropdown"
import MessageItem from "./MessageItem"
import AudioTextSend from "./AudioTextSend"
import AssistantCard from "./AssistantCard"

import { UserSchema } from "../../schemas/user.schema"
import { TTSRequestBodySchema } from "../../api.services/voice.service"
import { AssistantSchema } from "../../schemas/assistant.schema"
import { AssistanceRequestBodySchema } from "../../api.services/assistant.service"
import {
  AssistanceRoomMessageSchema,
  AssistanceRoomGetSchema,
  DeleteAssistanceRoomMessageRequestSchema,
} from "../../schemas/assiatant_room.schema"

import assistanceRoomsService from "../../api.services/assistance_rooms.service"
import assistantService from "../../api.services/assistant.service"
import voiceService from "../../api.services/voice.service"

function joinClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  currentUser: UserSchema | undefined
  currentAssistant: AssistantSchema | undefined
  currentRoom: AssistanceRoomGetSchema | undefined
  isListView: Boolean
  // setIsCardView: any
  setIsListView: any

  allowSpeaker: any
  setAllowSpeaker: any
  allowMic: any
  setAllowMic: any
  isAudioDirectly: any
  setIsAudioDirectly: any

  handleRoomsControlsChange: any
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
const IMAGE_GIF = "/assets/videos/Sphere.gif"

////////////////////////////////////////////////////////
export default function AssistanceRoom({
  currentUser,
  currentAssistant,
  currentRoom,
  isListView,
  setIsListView,

  allowSpeaker,
  setAllowSpeaker,
  allowMic,
  setAllowMic,
  isAudioDirectly,
  setIsAudioDirectly,

  handleRoomsControlsChange,
}: Props) {
  const location = useLocation()

  // const [currentRoom, setCurrentRoom] = useState<AssistanceRoomGetSchema>()
  const [isCardView, setIsCardView] = useState<Boolean>(false)

  const [roomMessageArray, setRoomMessageArray] = useState<
    AssistanceRoomMessageSchema[]
  >([])
  // const [incomingMessage, setIncomingMessage] = useState<IncomingMessage>();
  const [isAnswering, setIsAnswering] = useState(false)
  // const [prevDate, setPrevDate] = useState("");
  // const [blobUrl, setBlobUrl] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null)

  // const scrollRef = useRef<any>();

  const SpeakerStatusIcon = allowSpeaker ? SpeakerWaveIcon : SpeakerXMarkIcon

  ////////////////////////////////////////////////////////
  const copyMessageText = async (roomMessage: AssistanceRoomMessageSchema) => {
    try {
      await navigator.clipboard.writeText(roomMessage.text)
      console.log("Copied message text!!!")
    } catch (error: any) {
      console.log(error.toString())
    }
  }

  const deleteRoomMessage = async (
    roomMessage: AssistanceRoomMessageSchema
  ) => {
    console.log("Deleting an item of a translation record ...")

    const deleteRoomMessageRequest: DeleteAssistanceRoomMessageRequestSchema = {
      room_message_uuid: roomMessage?.uuid,
      assistance_room_uuid: currentRoom?.uuid,
    }
    console.log(deleteRoomMessageRequest)

    const response_deleteRoomMessage =
      await assistanceRoomsService.deleteAssistanceRoomMessage(
        deleteRoomMessageRequest
      )
    if (response_deleteRoomMessage.success) {
      const roomMessageArray_copy = Array.from(roomMessageArray)
      console.log("Before: ", roomMessageArray_copy.length)
      const index = roomMessageArray_copy.indexOf(roomMessage, 0)
      if (index > -1) {
        roomMessageArray_copy.splice(index, 1)
      }
      console.log("After: ", roomMessageArray_copy.length)
      setRoomMessageArray(roomMessageArray_copy)
    }
  }

  ////////////////////////////////////////////////////////
  useEffect(() => {
    setRoomMessageArray([])
  }, [location])

  useEffect(() => {
    setRoomMessageArray([])
    // setIsCardView(true)

    if (currentUser == undefined) {
      console.log("currentUser is undefined in Assistants !")
      // toast("You are not logged-in, so the assistants will not reply.")
    }

    if (currentRoom !== undefined) {
      setRoomMessageArray(currentRoom!.messages)
    }

    // if (!msgTextArray) {
    // setIsCardView(false)
    // }
  }, [currentRoom])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }, [roomMessageArray])

  const handleMsgSend = async (msg_text: string) => {
    console.log("*** Handling the message form submit ... ***")
    setIsAnswering(true)
    const sent: AssistanceRoomMessageSchema = {
      time_stamp: new Date(),
      sender_uuid: currentUser?.uuid,
      text: msg_text,
    }

    if (currentUser == undefined) {
      console.log("currentUser is undefined in AssistanceRoom handleMsgSend !")
      setRoomMessageArray((prev) => [...prev, sent])
      toast(
        "You are not logged-in, so " +
          currentAssistant?.persona.toLowerCase() +
          " does not reply."
      )
    } else {
      const assistanceRequestBody: AssistanceRequestBodySchema = {
        room_uuid: currentRoom?.uuid,
        msg_text: msg_text,
      }
      console.log(assistanceRequestBody)

      const response_assistant =
        await assistantService.sendTextMsg_receiveTextResponse(
          assistanceRequestBody
        )

      setRoomMessageArray((prev) => [...prev, response_assistant.msg_pair[0]])
      setRoomMessageArray((prev) => [...prev, response_assistant.msg_pair[1]])

      if (allowSpeaker) {
        const tts_requestBody: TTSRequestBodySchema = {
          text: response_assistant.msg_pair[1].text,
          voice: currentAssistant?.voice,
        }
        console.log(tts_requestBody)

        const response_tts = await voiceService.sendText_receiveSpeech(
          tts_requestBody
        )

        const audioElement = new Audio(
          `data:audio/mpeg;base64,${response_tts.audio_base64}`
        )

        void audioElement.play()
        console.log("*** Playing the audio of the assistant ... ***")
      }
    }
    setIsAnswering(false)
  }

  ////////////////////////////////////////////////////////
  return (
    <>
      {!currentAssistant && <WelcomeToAssistance />}

      {currentAssistant && (
        <>
          {currentAssistant && isCardView && (
            <AssistantCard
              assistant={currentAssistant}
              isCardView={isCardView}
              setIsCardView={setIsCardView}
            />
          )}
          <div
            className={joinClassNames(
              isCardView ? "hidden lg:!flex" : "flex",
              `w-full h-full flex-col items-stretch
           bg-[#FEFCFE] dark:bg-[#010301] relative`
            )}
          >
            {/* Header */}
            <header className="flex justify-center border-b border-gray-200 dark:border-gray-800 absolute top-0 bg-white dark:bg-black w-full">
              {/* <div className="flex justify-center border-b border-gray-200 dark:border-gray-800 bg-[#F0F0F0] dark:bg-[#1F1F1F] "> */}
              <div className="flex py-3 w-full max-w-4xl mx-2 justify-between items-center">
                <div className="flex gap-2 items-center">
                  {/* Go to Assistants Home */}
                  <Link to="/assistants" className="lg:hidden ps-4 pe-2">
                    <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <button
                    className={classNames(
                      isCardView
                        ? " hover:text-blue-500"
                        : "hover:ring-1 hover:ring-blue-500  hover:text-blue-500",
                      "flex items-center justify-center rounded-md p-1"
                    )}
                    data-tooltip-id="info-btn"
                    onClick={() => {
                      setIsCardView(!isCardView)
                    }}
                  >
                    <AssistanceRoomHeader currentAssistant={currentAssistant} />
                  </button>
                  <div
                    className={classNames(
                      allowSpeaker
                        ? "text-black dark:text-white"
                        : "text-gray-500",
                      // "h-6 w-6 flex items-center justify-center rounded-md focus:outline-none hover:ring-2 hover:ring-blue-500 hover:text-blue-500"
                      "h-6 w-6 flex items-center justify-center rounded-md"
                    )}
                    data-tooltip-id="speaker-status"
                  >
                    <SpeakerStatusIcon className="h-5 w-5" />
                  </div>
                  <ReactTooltip
                    id="speaker-status"
                    place="right"
                    content={allowSpeaker ? "Speaker is ON" : "Speaker is OFF"}
                  />

                  <ReactTooltip
                    id="info-btn"
                    place="left"
                    content={isCardView ? "Hide Info" : "View Info"}
                  />
                </div>

                <div className="flex gap-2 items-center">
                  {/* Controls dropdown */}
                  <ControlsDropdown
                    allowSpeaker={allowSpeaker}
                    setAllowSpeaker={setAllowSpeaker}
                    allowMic={allowMic}
                    setAllowMic={setAllowMic}
                    isAudioDirectly={isAudioDirectly}
                    setIsAudioDirectly={setIsAudioDirectly}
                    handleRoomsControlsChange={handleRoomsControlsChange}
                  />
                  <button
                    className={classNames(
                      isListView
                        ? "ring-2 ring-black dark:ring-white hover:text-blue-500"
                        : "hover:ring-2 hover:ring-blue-500  hover:text-blue-500",
                      "h-8 w-8 flex items-center justify-center rounded-md ",

                      "hidden lg:!flex"
                    )}
                    data-tooltip-id="list-btn"
                    onClick={() => {
                      setIsListView(!isListView)
                    }}
                  >
                    <ListBulletIcon className="h-7 w-7" />
                  </button>
                  <ReactTooltip
                    id="list-btn"
                    place="right"
                    content={isListView ? "Hide List" : "View List"}
                  />
                </div>
              </div>
            </header>

            <div className="w-full flex-1 flex p-6 overflow-y-auto justify-center absolute top-20 bottom-20">
              {roomMessageArray.length == 0 && (
                <div className="flex flex-col justify-center items-center rounded-3xl w-[200px] mb-64">
                  <img
                    src={IMAGE_GIF}
                    className="rounded-full  dark:invert dark:rotate-180"
                  />
                  <h3 className="">Please ask me anything</h3>
                </div>
              )}
              {roomMessageArray.length > 0 && (
                <div className="flex-1 max-w-4xl mx-auto">
                  <ul className="space-y-2">
                    {roomMessageArray.map((message, index) => (
                      <div className="" key={index} ref={scrollRef}>
                        <MessageItem
                          message={message}
                          currentUser_uuid={currentUser?.uuid}
                          currentAssistant={currentAssistant}
                          copyMessageText={copyMessageText}
                          deleteRoomMessage={deleteRoomMessage}
                          // prevDate={prevDate}
                          // setPrevDate={setPrevDate}
                        />
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <footer
              ref={scrollRef}
              className="border-t border-gray-200 dark:border-gray-800 absolute bottom-0 w-full bg-white dark:bg-black"
            >
              <div className="max-w-4xl mx-auto rounded-full">
                <AudioTextSend
                  handleMsgSend={handleMsgSend}
                  // assistant_display_name={"The assistant"}
                  assistant_display_name={
                    currentAssistant.persona + " " + currentAssistant.name
                  }
                  isAnswering={isAnswering}
                  allowMic={allowMic}
                  isAudioDirectly={isAudioDirectly}
                />
              </div>
            </footer>
          </div>
        </>
      )}
    </>
  )
}
