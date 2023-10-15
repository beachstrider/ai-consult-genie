import { useState, useEffect } from "react"

import MobileScreenHeader from "../../mainframe/MobileScreenHeader"

import SearchAssistants from "./SearchAssistants"
import AssistantsList from "./AssistantsList"

import { AssistantSchema } from "../../schemas/assistant.schema"

interface Props {
  currentUser: any
  currentAssistant: any
  contacts: any
  nonContacts: any
  deleteAssistanceRoom: any
}

export default function AssistantsSideList({
  currentUser,
  currentAssistant,
  contacts,
  nonContacts,
  deleteAssistanceRoom,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("")

  const [filteredContacts, setFilteredContacts] = useState<AssistantSchema[]>(
    []
  )
  const [filteredNonContacts, setFilteredNonContacts] = useState<
    AssistantSchema[]
  >([])

  useEffect(() => {
    handleSearch(searchQuery)
  }, [contacts, nonContacts])

  const handleSearch = (newSearchQuery: any) => {
    setSearchQuery(newSearchQuery)

    const searchedContacts = contacts.filter((contact: any) => {
      return contact.persona
        .toLowerCase()
        .includes(newSearchQuery.toLowerCase())
    })
    setFilteredContacts(searchedContacts)

    const searchedNonContacts = nonContacts.filter((nonContact: any) => {
      return nonContact.persona
        .toLowerCase()
        .includes(newSearchQuery.toLowerCase())
    })
    setFilteredNonContacts(searchedNonContacts)
  }

  // console.log("assistant_uuid", assistant_uuid)

  return (
    <div
      className={`flex flex-col flex-shrink-0 h-full  
                  border-l border-gray-200 dark:border-gray-800
                  bg-[#F7F5F7] dark:bg-gray-900
                  ${
                    currentAssistant === undefined
                      ? "w-full lg:!w-[300px]"
                      : "hidden lg:!flex w-[300px]"
                  }`}
    >
      {/* Mobile Screen header */}
      {<MobileScreenHeader currentUser={currentUser} />}

      {/* RoomsSidebar header */}
      <div className="flex h-16 items-center justify-center">
        <img
          className="w-8 h-8 dark:invert"
          src="/assets/icons_new/assistants_2.svg"
          alt="Icon"
        />
        <span className="block ml-2 text-lg font-medium pl-4 pr-4">
          Assistants
        </span>

        {/* <img
          className="w-7 h-7 object-cover"
          src="/assets/icons_new/chat-svgrepo-com.svg"
          alt=""
        /> */}
      </div>

      <SearchAssistants handleSearch={handleSearch} />

      <AssistantsList
        currentAssistant={currentAssistant}
        contacts={searchQuery == "" ? contacts : filteredContacts}
        nonContacts={searchQuery == "" ? nonContacts : filteredNonContacts}
        deleteAssistanceRoom={deleteAssistanceRoom}
      />
    </div>
  )
}
