import { useState, useEffect } from "react"

import MobileScreenHeader from "../../mainframe/MobileScreenHeader"

import NewTranslation from "./NewTranslation"
import SearchTranslations from "./SearchTranslations"
import TranslationsList from "./TranslationsList"

import { TranslationRecordsListItemSchema } from "../../schemas/translation_record.schema"

interface Props {
  currentUser: any
  currentTranslation: any
  openRecordsAll: any
  deleteTranslationRecord: any
}

export default function TranslationsSideList({
  currentUser,
  currentTranslation,
  openRecordsAll,
  deleteTranslationRecord,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("")

  const [filteredOpenRecordsAll, setFilteredOpenRecordsAll] = useState<
    TranslationRecordsListItemSchema[]
  >([])

  useEffect(() => {
    handleSearch(searchQuery)
  }, [openRecordsAll])

  const handleSearch = (newSearchQuery: any) => {
    setSearchQuery(newSearchQuery)

    const searchedContacts = openRecordsAll.filter((openRecord: any) => {
      return openRecord.title
        .toLowerCase()
        .includes(newSearchQuery.toLowerCase())
    })
    setFilteredOpenRecordsAll(searchedContacts)
  }

  console.log("openRecordsAll", openRecordsAll)

  return (
    <div
      className={`flex flex-col flex-shrink-0 h-full  
                  border-l border-gray-200 dark:border-gray-800
                  bg-[#F7F5F7] dark:bg-gray-900
                  ${
                    currentTranslation === undefined
                      ? "w-full lg:!w-[300px]"
                      : "hidden lg:!flex w-[300px]"
                  }`}
    >
      {/* Mobile Screen header */}
      {<MobileScreenHeader currentUser={currentUser} />}

      {/* RoomsSidebar header */}
      <div className="flex h-16 items-center justify-center ps-4 pe-4">
        <img
          className="w-8 h-8 invert dark:invert-0"
          src="/assets/icons_new/live-translator.svg"
          alt="Icon"
        />
        <span className="block text-lg font-medium pl-4 pr-4">
          Translations
        </span>
        {/* <img
          className="w-7 h-7 rounded-full object-cover  border border-gray-400 dark:border-gray-600 dark:invert"
          src="/assets/icons_new/translation-icon.svg"
          alt=""
        /> */}
      </div>

      <NewTranslation />

      <SearchTranslations handleSearch={handleSearch} />

      <TranslationsList
        currentTranslation={currentTranslation}
        openRecordsAll={
          searchQuery == "" ? openRecordsAll : filteredOpenRecordsAll
        }
        deleteTranslationRecord={deleteTranslationRecord}
      />
    </div>
  )
}
