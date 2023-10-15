import { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import {
  TranslationRecordGetSchema,
  TranslationRecordsListItemSchema,
  DeleteTranslationRecordRequestSchema,
} from "../../schemas/translation_record.schema"

import TranslationsSideList from "./TranslationsSideList"
import TranslationRecord from "./TranslationRecord"
import WelcomeToTranslator from "./WelcomeToTranslator"

import translationRecordsService from "../../api.services/translation_records.service"

import { useAuth } from "../../contexts/auth"
import { voices } from "../../constants/voices.constants"

const voices_available = Array.from(voices)
// voices_available.splice(0, 0, clone_voice)

//////////////////////////////////////////////////////////
export default function Translator() {
  const navigate = useNavigate()
  const location = useLocation()
  const { translation_id } = useParams()
  const { currentUser } = useAuth()

  const [isListView, setIsListView] = useState<Boolean>(true)

  const [openRecordsAll, setOpenRecordsAll] = useState<
    TranslationRecordsListItemSchema[]
  >([])

  const [currentTranslation, setCurrentTranslation] =
    useState<TranslationRecordGetSchema>()
  const [currentRecord, setCurrentRecord] =
    useState<TranslationRecordGetSchema>()

  const [allowRightSide, setAllowRightSide] = useState(true)
  const [allowSpeaker, setAllowSpeaker] = useState(false)
  const [voice, setVoice] = useState(voices_available[0])
  const [allowMic, setAllowMic] = useState(true)
  const [isAudioDirectly, setIsAudioDirectly] = useState(true)

  const handleRecordsControlsChange = () => {}
  ////////////////////////////////////////////////////////
  const deleteTranslationRecord = async (
    translation_record: TranslationRecordsListItemSchema
  ) => {
    console.log("deleting a  translation record...")

    const deleteTranslationRecordRequest: DeleteTranslationRecordRequestSchema =
      {
        translation_record_uuid: translation_record?.uuid,
      }
    console.log(deleteTranslationRecordRequest)

    const response_deleteTranslationRecord =
      await translationRecordsService.deleteTranslationRecord(
        deleteTranslationRecordRequest
      )

    if (response_deleteTranslationRecord.success) {
      const translationRecordsList_copy = Array.from(openRecordsAll)
      console.log("Before: ", translationRecordsList_copy.length)
      const index = translationRecordsList_copy.indexOf(translation_record, 0)
      if (index > -1) {
        translationRecordsList_copy.splice(index, 1)
      }
      console.log("After: ", translationRecordsList_copy.length)
      setOpenRecordsAll(translationRecordsList_copy)
      navigate("/live_translator")
    }
  }

  ////////////////////////////////////////////////////////
  useEffect(() => {
    setIsListView(true)
  }, [location])

  useEffect(() => {
    setIsAudioDirectly(false)
  }, [allowMic])

  // setCurrentTranslation
  useEffect(() => {
    setCurrentTranslation(undefined)
    const fetchData = async () => {
      if (translation_id != undefined) {
        const currentTranslation: TranslationRecordGetSchema = {
          id: translation_id,
          title: "Translation-" + translation_id,
          // name: "Translation",
          items: [],
        }
        setCurrentTranslation(currentTranslation)
      }
    }

    void fetchData()
  }, [currentUser, translation_id])

  // setCurrentRecord
  useEffect(() => {
    if (currentUser && currentTranslation) {
      console.log("currentUser is defined in Translations !")
      const fetchData = async () => {
        const currentRecord =
          await translationRecordsService.openRecordOfTranslationID(
            currentTranslation.id
          )
        setCurrentRecord(currentRecord)
      }

      void fetchData()
      // if (!msgTextArray) {
      //   setIsCardView(true)
      // }
    } else {
      if (currentTranslation == undefined) {
        // toast("You are not logged-in, so the Translations will not reply.")
      }
      if (currentUser == undefined) {
        toast(
          "You are not logged-in, so the " +
            currentTranslation?.title +
            " will not work."
        )
      }
    }
  }, [currentUser, currentTranslation])

  // setOpenRecordsAll
  useEffect(() => {
    // setOpenRecordsAll([])

    const fetchData = async () => {
      if (currentUser !== undefined) {
        const openRecordsAll: TranslationRecordsListItemSchema[] | undefined =
          await translationRecordsService.getTranslationRecordsAll()
        setOpenRecordsAll(openRecordsAll || [])
      } else {
        console.log("currentUser is undefined in Translations !")
        // toast("You are not logged-in, so the Translation does not reply.")
      }
    }

    void fetchData()
  }, [currentUser, currentRecord])

  // console.log("currentUser: ", currentUser)
  console.log("translation_id: ", translation_id)
  // console.log("contacts: ", contacts)

  return (
    <>
      {translation_id == undefined && <WelcomeToTranslator />}

      {translation_id !== undefined && (
        <TranslationRecord
          currentUser={currentUser}
          currentTranslation={currentTranslation}
          currentRecord={currentRecord}
          isListView={isListView}
          setIsListView={setIsListView}
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
          handleRecordsControlsChange={handleRecordsControlsChange}
        />
      )}

      {isListView && (
        <TranslationsSideList
          currentUser={currentUser}
          currentTranslation={currentTranslation}
          openRecordsAll={openRecordsAll}
          deleteTranslationRecord={deleteTranslationRecord}
        />
      )}
    </>
  )
}
