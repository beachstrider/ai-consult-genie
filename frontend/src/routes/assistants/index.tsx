import { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { AssistantSchema } from "../../schemas/assistant.schema"
import {
  AssistanceRoomGetSchema,
  AssistanceRoomListItemSchema,
  DeleteAssistanceRoomRequestSchema,
} from "../../schemas/assiatant_room.schema"

import AssistantsSideList from "./AssistantsSideList"
import AssistanceRoom from "./AssistanceRoom"
import WelcomeToAssistance from "./WelcomeToAssistance"

import assistanceRoomsService from "../../api.services/assistance_rooms.service"

import { useAuth } from "../../contexts/auth"

interface Props {
  assistantsAll: AssistantSchema[]
}

export default function Assistants({ assistantsAll }: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const { assistant_persona } = useParams()
  const { currentUser } = useAuth()

  const [isListView, setIsListView] = useState<Boolean>(true)

  const [openRoomsAll, setOpenRoomsAll] = useState<any[]>([])

  const [contactsIds, setContactsIds] = useState<any[]>([])
  const [contacts, setContacts] = useState<AssistantSchema[]>([])
  const [nonContacts, setNonContacts] = useState<AssistantSchema[]>([])

  const [currentAssistant, setCurrentAssistant] = useState<AssistantSchema>()
  const [currentRoom, setCurrentRoom] = useState<AssistanceRoomGetSchema>()

  const [allowSpeaker, setAllowSpeaker] = useState(false)
  const [allowMic, setAllowMic] = useState(true)
  const [isAudioDirectly, setIsAudioDirectly] = useState(false)

  const handleRoomsControlsChange = () => {}
  ////////////////////////////////////////////////////////
  const deleteAssistanceRoom = async (
    // assistance_room: AssistanceRoomListItemSchema
    assistant: AssistantSchema
  ) => {
    console.log("deleting an assistance room")

    const assistance_rooms = openRoomsAll.filter(
      (openRoom: AssistanceRoomListItemSchema) =>
        openRoom.assistant_uuid == assistant.uuid
    )
    const assistance_room = assistance_rooms[0]

    const deleteAssistantRoomRequest: DeleteAssistanceRoomRequestSchema = {
      assistance_room_uuid: assistance_room?.uuid,
    }
    console.log(deleteAssistantRoomRequest)

    const response_deleteMsgItem =
      await assistanceRoomsService.deleteAssistanceRoom(
        deleteAssistantRoomRequest
      )

    if (response_deleteMsgItem.success) {
      const assistanceRoomsList_copy = Array.from(openRoomsAll)
      console.log("Before: ", assistanceRoomsList_copy.length)
      const index = assistanceRoomsList_copy.indexOf(assistance_room, 0)
      if (index > -1) {
        assistanceRoomsList_copy.splice(index, 1)
      }
      console.log("After: ", assistanceRoomsList_copy.length)
      setOpenRoomsAll(assistanceRoomsList_copy)
      navigate("/assistants")
    }
  }

  ////////////////////////////////////////////////////////

  useEffect(() => {
    setIsListView(true)
  }, [location])

  // setCurrentAssistant
  useEffect(() => {
    setCurrentAssistant(undefined)
    const fetchData = async () => {
      if (assistant_persona != undefined) {
        const currentAssistant = assistantsAll.find(
          (assistant) =>
            assistant.persona.replaceAll(" ", "_").toLowerCase() ==
            assistant_persona.toLowerCase()
        )
        setCurrentAssistant(currentAssistant)
      }
    }

    void fetchData()
  }, [currentUser, assistantsAll, assistant_persona])

  // setCurrentRoom
  useEffect(() => {
    if (currentUser && currentAssistant) {
      console.log("currentUser is defined in Assistants !")
      const fetchData = async () => {
        const currentRoom =
          await assistanceRoomsService.openRoomOfAssistantUUID(
            currentAssistant.uuid
          )
        setCurrentRoom(currentRoom)
      }

      void fetchData()
      // if (!msgTextArray) {
      //   setIsCardView(true)
      // }
    } else {
      if (currentAssistant == undefined) {
        // toast("You are not logged-in, so the assistants will not reply.")
      } else {
        toast(
          "You are not logged-in, so the assistant " +
            currentAssistant?.persona +
            " will not reply."
        )
      }
    }
  }, [currentUser, currentAssistant])

  // setOpenRoomsAll
  useEffect(() => {
    // setOpenRoomsAll([])

    const fetchData = async () => {
      if (currentUser !== undefined) {
        const openRoomsAll: AssistanceRoomListItemSchema[] | undefined =
          await assistanceRoomsService.getAllOpenRooms()
        setOpenRoomsAll(openRoomsAll || [])
      } else {
        console.log("currentUser is undefined in Assistants !")
        // toast("You are not logged-in, so the assistant does not reply.")
      }
    }

    void fetchData()
  }, [currentUser, currentRoom])

  // setContactsIds
  useEffect(() => {
    const contactsIds = openRoomsAll.map((openRoom: any) => {
      return openRoom?.assistant_uuid
    })
    setContactsIds(contactsIds)
  }, [openRoomsAll, currentUser, currentRoom])

  // setContacts
  useEffect(() => {
    setContacts(
      assistantsAll.filter((assistant: AssistantSchema) =>
        contactsIds.includes(assistant.uuid)
      )
    )
  }, [contactsIds, assistantsAll, currentUser, currentRoom])

  // setNonContacts
  useEffect(() => {
    setNonContacts(
      assistantsAll.filter(
        (assistant: AssistantSchema) => !contactsIds.includes(assistant.uuid)
      )
    )
  }, [contactsIds, assistantsAll, currentUser, currentRoom])

  // console.log("currentUser: ", currentUser)
  // console.log("currentAssistant: ", currentAssistant)
  // console.log("contacts: ", contacts)

  return (
    <>
      {assistant_persona == undefined && <WelcomeToAssistance />}
      {/* {currentAssistant && isCardView && (
        <AssistantCard
          assistant={currentAssistant}
          isCardView={isCardView}
          setIsCardView={setIsCardView}
        />
      )} */}

      {assistant_persona !== undefined && (
        <AssistanceRoom
          currentUser={currentUser}
          currentAssistant={currentAssistant}
          currentRoom={currentRoom}
          isListView={isListView}
          setIsListView={setIsListView}
          allowSpeaker={allowSpeaker}
          setAllowSpeaker={setAllowSpeaker}
          allowMic={allowMic}
          setAllowMic={setAllowMic}
          isAudioDirectly={isAudioDirectly}
          setIsAudioDirectly={setIsAudioDirectly}
          handleRoomsControlsChange={handleRoomsControlsChange}
        />
      )}

      {isListView && (
        <AssistantsSideList
          currentUser={currentUser}
          currentAssistant={currentAssistant}
          contacts={contacts}
          nonContacts={nonContacts}
          deleteAssistanceRoom={deleteAssistanceRoom}
        />
      )}
    </>
  )
}
