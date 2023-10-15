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

import {
  FadingBalls,
  BarWave,
  Messaging,
  BouncingBalls,
} from "react-cssfx-loading"

import WelcomeToTranslator from "./WelcomeToTranslator"
import TranslationRoomHeader from "./TranslationRoomHeader"
import TranslatorControlsDropdown from "./TranslatorControlsDropdown"
import MessageItem from "./MessageItem"
import AudioTextSend from "./AudioTextSend"
import TranslationCard from "./TranslationCard"
import LanguagesDropdown from "./LanguagesDropdown"

import { UserSchema } from "../../schemas/user.schema"
import { TTSRequestBodySchema } from "../../api.services/voice.service"
import { TranslationRequestBodySchema } from "../../api.services/translator.service"
import {
  TranslationItemSchema,
  TranslationRecordGetSchema,
  DeleteRecordItemRequestSchema,
} from "../../schemas/translation_record.schema"

import translationRecordsService from "../../api.services/translation_records.service"
import translatorService from "../../api.services/translator.service"
import voiceService from "../../api.services/voice.service"

function joinClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  currentUser: UserSchema | undefined
  currentTranslation: TranslationRecordGetSchema | undefined
  currentRecord: TranslationRecordGetSchema | undefined
  isListView: Boolean
  // setIsCardView: any
  setIsListView: any

  allowRightSide: any
  setAllowRightSide: any
  allowSpeaker: any
  setAllowSpeaker: any

  voices_available: any
  voice: any
  setVoice: any

  allowMic: any
  setAllowMic: any
  isAudioDirectly: any
  setIsAudioDirectly: any

  handleRecordsControlsChange: any
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
const IMAGE_GIF = "/assets/videos/Sphere.gif"

////////////////////////////////////////////////////////
export default function TranslationRecord({
  currentUser,
  currentTranslation,
  currentRecord,
  isListView,
  setIsListView,

  allowRightSide,
  setAllowRightSide,
  allowSpeaker,
  setAllowSpeaker,

  voices_available,
  voice,
  setVoice,

  allowMic,
  setAllowMic,
  isAudioDirectly,
  setIsAudioDirectly,

  handleRecordsControlsChange,
}: Props) {
  const location = useLocation()

  const [isCardView, setIsCardView] = useState<Boolean>(false)

  const [currentSide, setCurrentSide] = useState<"left" | "right">("left")
  const [inputStatus, setInputStatus] = useState<
    "idle" | "typing" | "recording" | "transcribing" | "answering"
  >("idle")
  const [LeftLanguage, setLeftLanguage] = useState<any>()
  const [RightLanguage, setRightLanguage] = useState<any>()
  const [currentLanguage, setCurrentLanguage] = useState<any>()

  const [recordItemArray, setRecordItemArray] = useState<
    TranslationItemSchema[]
  >([])

  const scrollRef = useRef<HTMLDivElement>(null)
  // const scrollRef = useRef<any>();

  const SpeakerStatusIcon = allowSpeaker ? SpeakerWaveIcon : SpeakerXMarkIcon

  ////////////////////////////////////////////////////////
  const copyOriginalText = async (recordItem: TranslationItemSchema) => {
    try {
      await navigator.clipboard.writeText(recordItem.original_text)
      console.log("Copied original text!!!")
    } catch (error: any) {
      console.log(error.toString())
    }
  }

  const copyTranslationText = async (recordItem: TranslationItemSchema) => {
    try {
      await navigator.clipboard.writeText(recordItem.translation_text)
      console.log("Copied translation text!!!")
    } catch (error: any) {
      console.log(error.toString())
    }
  }

  const deleteRecordItem = async (recordItem: TranslationItemSchema) => {
    console.log("Deleting an item of a translation record ...")

    const deleteRecordItemRequest: DeleteRecordItemRequestSchema = {
      record_item_uuid: recordItem?.uuid,
      translation_record_uuid: currentRecord?.uuid,
    }
    console.log(deleteRecordItemRequest)

    const response_deleteRecordItem =
      await translationRecordsService.deleteRecordItem(deleteRecordItemRequest)
    if (response_deleteRecordItem.success) {
      const recordItemArray_copy = Array.from(recordItemArray)
      console.log("Before: ", recordItemArray_copy.length)
      const index = recordItemArray_copy.indexOf(recordItem, 0)
      if (index > -1) {
        recordItemArray_copy.splice(index, 1)
      }
      console.log("After: ", recordItemArray_copy.length)
      setRecordItemArray(recordItemArray_copy)
    }
  }

  ////////////////////////////////////////////////////////
  useEffect(() => {
    setRecordItemArray([])
  }, [location])

  useEffect(() => {
    setRecordItemArray([])
    if (currentUser == undefined) {
      console.log("currentUser is undefined in Assistants !")
      // toast("You are not logged-in, so the assistants will not reply.")
    }
    if (currentRecord !== undefined) {
      setRecordItemArray(currentRecord!.items)
    }
  }, [currentRecord])

  useEffect(() => {
    if (currentSide == "left") {
      setCurrentLanguage(LeftLanguage)
    }
    if (currentSide == "right") {
      setCurrentLanguage(RightLanguage)
    }
  }, [currentSide, LeftLanguage, RightLanguage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }, [recordItemArray, inputStatus])

  const handleTranslationRequestSend = async (text: string) => {
    console.log("*** Handling the translation request submit ... ***")
    setInputStatus("answering")
    const sent: TranslationItemSchema = {
      time_stamp: new Date(),
      side: currentSide,

      original_language_name:
        currentSide == "left" ? LeftLanguage.name : RightLanguage.name,
      original_language_localname:
        currentSide == "left"
          ? LeftLanguage.local_name
          : RightLanguage.local_name,
      original_text: text,

      target_language_name:
        currentSide == "left" ? RightLanguage.name : LeftLanguage.name,
      target_language_localname:
        currentSide == "left"
          ? RightLanguage.local_name
          : LeftLanguage.local_name,
      translation_text: "",
    }

    if (currentUser == undefined) {
      // console.log("currentUser is undefined in AssistanceRoom handleRecordItemSend !")
      let received = sent
      received.translation_text = text
      setTimeout(() => {
        toast("You are not logged-in, so " + "translator does not reply.")
        // toast("You are not logged-in, so the voice service does not work.")
        setRecordItemArray((prev) => [...prev, sent])
        setInputStatus("idle")
      }, 500)
    } else {
      const translationRequestBody: TranslationRequestBodySchema = {
        translation_record_uuid: currentRecord?.uuid,
        translation_record_item: sent,
      }
      const response_translation =
        await translatorService.sendTranslationRequest_receiveTranslationText(
          translationRequestBody
        )

      setRecordItemArray((prev) => [
        ...prev,
        response_translation.translation_record_item,
      ])

      if (allowSpeaker) {
        const tts_requestBody: TTSRequestBodySchema = {
          text: response_translation.translation_record_item.translation_text,
          voice: voice.name,
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
      // setInputStatus("idle")
    }
  }

  // console.log("LeftLanguage: ", LeftLanguage)
  // console.log("RightLanguage: ", RightLanguage)
  // console.log("currentLanguage: ", currentLanguage)

  ////////////////////////////////////////////////////////
  return (
    <>
      {!currentTranslation && <WelcomeToTranslator />}

      {currentTranslation && (
        <>
          {currentTranslation && isCardView && (
            <TranslationCard
              currentTranslation={currentTranslation}
              isCardView={isCardView}
              setIsCardView={setIsCardView}
            />
          )}

          <div
            className={joinClassNames(
              isCardView ? "hidden lg:!flex" : "flex",
              `w-full h-full flex-col
              bg-[#F7F5F7] dark:bg-gray-900`
            )}
          >
            {/* Header */}
            <header className="flex justify-center border-b border-gray-200 dark:border-gray-800 z-50 w-full">
              <div className="flex flex-col w-full items-center">
                <div className="flex pt-2 w-full max-w-4xl px-2 justify-between items-center">
                  <div className="flex gap-2 items-center">
                    {/* Go to Assistants Home */}
                    <Link to="/live_translator" className="lg:hidden ps-4 pe-2">
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
                      <TranslationRoomHeader
                        currentTranslation={currentTranslation}
                      />
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
                      content={
                        allowSpeaker ? "Speaker is ON" : "Speaker is OFF"
                      }
                    />

                    <ReactTooltip
                      id="info-btn"
                      place="left"
                      content={isCardView ? "Hide Info" : "View Info"}
                    />
                  </div>

                  <div className="flex gap-2 items-center">
                    {/* Controls dropdown */}
                    <TranslatorControlsDropdown
                      allowRightSide={allowRightSide}
                      setAllowRightSide={setAllowRightSide}
                      allowSpeaker={allowSpeaker}
                      setAllowSpeaker={setAllowSpeaker}
                      voices_available={voices_available}
                      voice={voice}
                      setVoice={setVoice}
                      allowMic={allowMic}
                      setAllowMic={setAllowMic}
                      isAudioDirectly={isAudioDirectly}
                      setIsAudioDirectly={setIsAudioDirectly}
                      handleRoomsControlsChange={handleRecordsControlsChange}
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

                <div className="flex py-1 w-full max-w-4xl px-2 justify-between items-center">
                  <div className="flex items-center bg-blue-500 dark:bg-blue-900 rounded-md">
                    <LanguagesDropdown
                      color="blue"
                      setLanguage={setLeftLanguage}
                    />
                  </div>

                  <div className="flex items-center bg-green-500 dark:bg-green-900 rounded-md">
                    <LanguagesDropdown
                      color="green"
                      setLanguage={setRightLanguage}
                    />
                  </div>
                </div>
              </div>
            </header>

            <div className="w-full flex-1 flex px-4 overflow-y-auto justify-center bg-[#FEFCFE] dark:bg-[#010301]">
              {recordItemArray.length == 0 && inputStatus == "idle" && (
                <div className="flex flex-col justify-center items-center rounded-3xl w-[200px] mb-64">
                  <img
                    src={IMAGE_GIF}
                    className="rounded-full  dark:invert dark:rotate-180"
                  />
                  <h3 className="">Please say anything</h3>
                </div>
              )}

              {recordItemArray.length == 0 && inputStatus !== "idle" && (
                <div className="flex flex-col justify-center items-center rounded-3xl w-[200px] mb-64">
                  {inputStatus == "typing" && (
                    <div className="flex-1 flex justify-center py-4">
                      <BouncingBalls
                        color={`${
                          currentSide == "left" ? "#3B82F6" : "#22C55E"
                        }`}
                      />
                    </div>
                  )}

                  {inputStatus == "recording" && (
                    <div className="flex-1 flex justify-center py-4">
                      <BarWave
                        width="64px"
                        height="32px"
                        duration="0.8s"
                        color={`${
                          currentSide == "left" ? "#3B82F6" : "#22C55E"
                        }`}
                      />
                    </div>
                  )}

                  {inputStatus == "transcribing" && (
                    <div className="flex-1 flex justify-center py-4">
                      <FadingBalls
                        color={`${
                          currentSide == "left" ? "#3B82F6" : "#22C55E"
                        }`}
                      />
                    </div>
                  )}
                  {inputStatus == "answering" && (
                    <div className="flex-1 flex justify-center py-4">
                      <Messaging
                        color={`${
                          currentSide == "left" ? "#3B82F6" : "#22C55E"
                        }`}
                      />
                    </div>
                  )}
                </div>
              )}

              {recordItemArray.length > 0 && (
                <div className="flex-1 max-w-4xl mx-auto">
                  <ul className="space-y-2 py-6">
                    {recordItemArray.map((recordItem, index) => (
                      <div className="" key={index} ref={scrollRef}>
                        <MessageItem
                          recordItem={recordItem}
                          copyOriginalText={copyOriginalText}
                          copyTranslationText={copyTranslationText}
                          deleteRecordItem={deleteRecordItem}
                        />
                      </div>
                    ))}
                  </ul>
                  {inputStatus == "typing" && (
                    <div
                      className="flex-1 flex justify-center py-4"
                      ref={scrollRef}
                    >
                      <BouncingBalls
                        color={`${
                          currentSide == "left" ? "#3B82F6" : "#22C55E"
                        }`}
                      />
                    </div>
                  )}

                  {inputStatus == "recording" && (
                    <div
                      className="flex-1 flex justify-center py-4"
                      ref={scrollRef}
                    >
                      <BarWave
                        width="64px"
                        height="32px"
                        duration="0.8s"
                        color={`${
                          currentSide == "left" ? "#3B82F6" : "#22C55E"
                        }`}
                      />
                    </div>
                  )}

                  {inputStatus == "transcribing" && (
                    <div
                      className="flex-1 flex justify-center py-4"
                      ref={scrollRef}
                    >
                      <FadingBalls
                        color={`${
                          currentSide == "left" ? "#3B82F6" : "#22C55E"
                        }`}
                      />
                    </div>
                  )}
                  {inputStatus == "answering" && (
                    <div
                      className="flex-1 flex justify-center py-4"
                      ref={scrollRef}
                    >
                      <Messaging
                        color={`${
                          currentSide == "left" ? "#3B82F6" : "#22C55E"
                        }`}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <span
              className={classNames(
                currentSide == "left" ? "text-left" : "text-right",
                "text-gray-500 pl-2 text-xs"
              )}
            >
              {inputStatus === "typing"
                ? currentLanguage?.name +
                  ` (` +
                  currentLanguage?.local_name +
                  `) typing ...`
                : inputStatus === "recording"
                ? currentLanguage?.name +
                  ` (` +
                  currentLanguage?.local_name +
                  `) speech is being recorded ...`
                : inputStatus == "transcribing"
                ? isAudioDirectly
                  ? "Transltor" +
                    ` is listening ` +
                    currentLanguage?.name +
                    ` (` +
                    currentLanguage?.local_name +
                    `) speech ...`
                  : currentLanguage?.name +
                    ` (` +
                    currentLanguage?.local_name +
                    `) speech is being transcribed ...`
                : inputStatus == "answering"
                ? "Transltor" + ` is responding ...`
                : ``}
            </span>

            <footer
              ref={scrollRef}
              className="border-t border-gray-200 dark:border-gray-800 w-full bg-[#F7F5F7] dark:bg-gray-900"
            >
              <div className="max-w-4xl mx-auto rounded-full flex items-center justify-between">
                {(inputStatus == "idle" ||
                  currentSide == "left" ||
                  (currentSide == "right" && inputStatus !== "typing")) && (
                  <AudioTextSend
                    handleTranslationRequestSend={handleTranslationRequestSend}
                    currentLanguage={currentLanguage}
                    allowMic={allowMic}
                    isAudioDirectly={isAudioDirectly}
                    side="left"
                    currentSide={currentSide}
                    setCurrentSide={setCurrentSide}
                    inputStatus={inputStatus}
                    setInputStatus={setInputStatus}
                    inputboxcolor="blue"
                  />
                )}
                {allowRightSide &&
                  (inputStatus == "idle" ||
                    currentSide == "right" ||
                    (currentSide == "left" && inputStatus !== "typing")) && (
                    <AudioTextSend
                      handleTranslationRequestSend={
                        handleTranslationRequestSend
                      }
                      currentLanguage={currentLanguage}
                      allowMic={allowMic}
                      isAudioDirectly={isAudioDirectly}
                      side="right"
                      currentSide={currentSide}
                      setCurrentSide={setCurrentSide}
                      inputStatus={inputStatus}
                      setInputStatus={setInputStatus}
                      inputboxcolor="green"
                    />
                  )}
              </div>
            </footer>
          </div>
        </>
      )}
    </>
  )
}
