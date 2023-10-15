import { useState } from "react"
import MobileScreenHeader from "../../mainframe/MobileScreenHeader"
import { AssistantSchema } from "../../schemas/assistant.schema"

import HeroSection from "./HeroSection"

import HomeSearch from "./HomeSearch"
// import TabsBar from "./TabsBar"
// import ImageCardsContainer from "./ImageCardsContainer"
import AssistantsCardsSlider from "./AssistantsCardsSlider"
// import ToolsCardsSlider from "./ToolsCardsSlider"
import ToolsCardsContainer from "./ToolsCardsContainer"

import { useAuth } from "../../contexts/auth"
// import { AssistanceRoomSchema } from "../../schemas/room"

interface Props {
  assistantsAll: AssistantSchema[]
}

/////////////////////////////////////////////
export default function Home({ assistantsAll }: Props) {
  // const [modal, setModal] = useState(false)
  const { currentUser } = useAuth()
  // const [openRoomsAll, setOpenRoomsAll] = useState<any[]>([])

  // const [contactsIds, setContactsIds] = useState<any[]>([])
  // const [contacts, setContacts] = useState<AssistantSchema[]>([])
  // const [nonContacts, setNonContacts] = useState<AssistantSchema[]>([])

  const [searchQuery, setSearchQuery] = useState("")

  const [filteredAssistants, setFilteredAssistants] = useState<
    AssistantSchema[]
  >([])
  // const [filteredContacts, setFilteredContacts] = useState<AssistantSchema[]>(
  //   []
  // )
  // const [filteredNonContacts, setFilteredNonContacts] = useState<
  //   AssistantSchema[]
  // >([])

  // const [viewAssistants, setViewAssistants] = useState<
  //   "All" | "Contacted" | "Others"
  // >("All")

  // console.log(viewAssistants)

  ////////////////////////////////////////////////////////////////////
  // // setOpenRoomsAll
  // useEffect(() => {
  //   // setOpenRoomsAll([])

  //   const fetchData = async () => {
  //     if (currentUser !== undefined) {
  //       const openRoomsAll: AssistanceRoomSchema[] | undefined =
  //         await assistanceRoomsService.getOpenRooms()
  //       setOpenRoomsAll(openRoomsAll || [])
  //     } else {
  //       console.log("currentUser is undefined in Assistants !")
  //       // toast("You are not logged-in, so the assistant does not reply.")
  //     }
  //   }

  //   void fetchData()
  // }, [currentUser])

  // // setContactsIds
  // useEffect(() => {
  //   const contactsIds = openRoomsAll.map((openRoom: any) => {
  //     return openRoom?.assistant_uuid
  //   })
  //   setContactsIds(contactsIds)
  // }, [openRoomsAll, currentUser])

  // // setContacts
  // useEffect(() => {
  //   setContacts(
  //     assistantsAll.filter((assistant: AssistantSchema) =>
  //       contactsIds.includes(assistant.uuid)
  //     )
  //   )
  // }, [contactsIds, assistantsAll, currentUser])

  // // setNonContacts
  // useEffect(() => {
  //   setNonContacts(
  //     assistantsAll.filter(
  //       (assistant: AssistantSchema) => !contactsIds.includes(assistant.uuid)
  //     )
  //   )
  // }, [contactsIds, assistantsAll, currentUser])

  const handleSearch = (newSearchQuery: any) => {
    setSearchQuery(newSearchQuery)

    const searchedAssistants = assistantsAll.filter((assistant: any) => {
      return assistant.persona
        .toLowerCase()
        .includes(newSearchQuery.toLowerCase())
    })
    setFilteredAssistants(searchedAssistants)

    // const searchedContacts = contacts.filter((contact: any) => {
    //   return contact.persona
    //     .toLowerCase()
    //     .includes(newSearchQuery.toLowerCase())
    // })
    // setFilteredContacts(searchedContacts)

    // const searchedNonContacts = nonContacts.filter((nonContact: any) => {
    //   return nonContact.persona
    //     .toLowerCase()
    //     .includes(newSearchQuery.toLowerCase())
    // })
    // setFilteredNonContacts(searchedNonContacts)
  }

  return (
    <div
      className="flex flex-col w-full h-full overflow-y-auto
      bg-[#FEFCFE] dark:bg-[#010301] text-black dark:text-white"
    >
      {/* Mobile Screen header */}
      <MobileScreenHeader currentUser={currentUser} />

      <div className="overflow-y-auto focus:outline-none">
        <div className="flex justify-center mb-4">
          <HeroSection
          // title="Hi, I am Adamo"
          // discription1="who can help you fully"
          // discription2="with the modernest AI power"
          // videoSrc="./assets/videos/Sphere.mp4"
          />
        </div>

        <div
          className="flex flex-col items-center justify-center sm:justify-center      
        "
        >
          <div className="w-[340px] flex justify-between items-center">
            {/* <h1 className="items-center  justify-start flex dark:brightness-50 my-1 ms-4">
              <img
                className="h-6 w-6 invert dark:invert-0"
                src="/assets/icons_new/assistants.svg"
                aria-hidden="true"
              />
              <span className="px-2 text-md font-bold">Assistants</span>
            </h1> */}

            {/* <div className="w-[150px] me-4"> */}
            <div className="flex-grow mx-4">
              <HomeSearch handleSearch={handleSearch} />
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div
            className="flex-1 flex  max-w-[340px] sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl
           justify-between items-center mt-4 "
          >
            <h1 className="items-center  justify-start flex dark:brightness-50 my-1 ms-4">
              <img
                className="h-6 w-6 invert dark:invert-0"
                src="/assets/icons_new/assistants.svg"
                aria-hidden="true"
              />
              <span className="px-2 text-md font-bold">Assistants</span>
            </h1>
          </div>
        </div>

        <div className="flex-1 mt-2 mx-2 mb-4">
          {/* Assistants */}
          <div className="flex-1 flex justify-center items-center mt-2">
            <div className="flex-1 flex flex-col justify-center sm:flex-row">
              {/* <h1 className="items-center  justify-center sm:flex hidden  dark:brightness-50 m-1"> */}
              {/* <img
                  className="h-6 w-6 invert dark:invert-0"
                  src="/assets/icons_new/assistants.svg"
                  aria-hidden="true"
                /> */}
              {/* <span className="px-2 text-md font-bold">Assistants</span>
              </h1> */}

              {/* <div className="flex items-center justify-center m-1">
                <TabsBar
                  viewAssistants={viewAssistants}
                  setViewAssistants={setViewAssistants}
                  number_all={
                    searchQuery == ""
                      ? assistantsAll.length
                      : filteredAssistants.length
                  }
                  number_contacts={
                    searchQuery == ""
                      ? contacts.length
                      : filteredContacts.length
                  }
                  number_noncontacts={
                    searchQuery == ""
                      ? nonContacts.length
                      : filteredNonContacts.length
                  }
                />
              </div> */}
            </div>
          </div>

          <section className="max-w-[340px] sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto overflow-x-hidden">
            <div
              className="flex flex-wrap overflow-y-auto justify-center 
                      overflow-x-hidden"
            >
              {/* {viewAssistants == "All" && ( */}
              <AssistantsCardsSlider
                cards={searchQuery == "" ? assistantsAll : filteredAssistants}
              />
              {/* )}
              {viewAssistants == "Contacted" && (
                <AssistantsCardsSlider
                  cards={searchQuery == "" ? contacts : filteredContacts}
                />
              )}
              {viewAssistants == "Others" && (
                <AssistantsCardsSlider
                  cards={searchQuery == "" ? nonContacts : filteredNonContacts}
                />
              )} */}
            </div>
          </section>

          {/* Tools */}
          <div className="flex-1 flex justify-center mt-4">
            <div className="flex-1 flex justify-between max-w-[340px] sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-4xl 2xl:max-w-4xl mx-auto overflow-x-hidden flex-col">
              <h1 className="flex items-center  justify-start dark:brightness-50 ms-4">
                <img
                  className="h-5 w-5 invert dark:invert-0"
                  src="/assets/icons_new/tools.svg"
                  aria-hidden="true"
                />
                <span className="px-2 text-md font-bold">Tools</span>
              </h1>
            </div>
          </div>

          <section className="max-w-[340px] sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-4xl 2xl:max-w-4xl mx-auto overflow-x-hidden">
            <div
              className="flex flex-wrap overflow-y-auto justify-center 
                      m-2 md:m-2"
            >
              <ToolsCardsContainer />
            </div>
          </section>
          {/* <ImageCardsContainer
            assistants={searchQuery == "" ? assistantsAll : filteredAssistants}
          /> */}
        </div>

        {/* <div className="flex-1 mx-2 py-6">
          <section className="max-w-7xl mx-auto">
            <h3 className="font-bold text-sm text-gray-500 my-2">
              Languages supported on Adamo speakers
            </h3>
          </section>
          <LanguageCardsContainer />
        </div> */}
      </div>
    </div>
  )
}
