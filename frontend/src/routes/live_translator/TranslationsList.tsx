import { Link } from "react-router-dom"
import TranslationItem from "./TranslationItem"
import { useContextMenu } from "mantine-contextmenu"
import {
  TrashIcon,
  // DocumentDuplicateIcon,
  // ArrowDownOnSquareIcon,
} from "@heroicons/react/24/outline"

import { TranslationRecordsListItemSchema } from "../../schemas/translation_record.schema"

type Props = {
  openRecordsAll: Array<TranslationRecordsListItemSchema>
  currentTranslation: any
  deleteTranslationRecord: any
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

export default function TranslationsList({
  openRecordsAll,
  currentTranslation,
  deleteTranslationRecord,
}: Props) {
  ////////////////////////////////////////////////////////////////////////////////////
  const showContextMenu = useContextMenu()

  ////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <ul className="overflow-y-auto w-full flex-1">
        {/* {openRecordsAll.length > 0 && (
          <h2
            className="mx-4 my-2 pt-4 font-bold text-xs
                      text-gray-500"
          >
            Contacted ({openRecordsAll.length})
          </h2>
        )} */}

        <li className="">
          {openRecordsAll.map((openRecord: any, index: any) => (
            <Link
              to={"/live_translator/" + openRecord.id}
              key={index}
              className={classNames(
                openRecord.id == currentTranslation?.id
                  ? "bg-white dark:bg-black font-medium"
                  : "transition duration-150 ease-in-out cursor-pointer hover:bg-white dark:hover:bg-black hover:font-medium ",
                "flex text-sm hover:bg-dark-lighten relative items-stretch gap-2 py-2 px-2 transition duration-300 rounded-lg m-3 "
              )}
              onContextMenu={showContextMenu(
                [
                  // {
                  //   key: "copy",
                  //   icon: <DocumentDuplicateIcon className="h-4 w-4" />,
                  //   title: "Copy",
                  //   onClick: () => {},
                  //   color: "blue",
                  // },

                  // { key: "divider" },

                  {
                    key: "delete",
                    icon: <TrashIcon className="h-4 w-4" />,
                    title: "Delete",
                    onClick: () => {
                      deleteTranslationRecord(openRecord)
                    },
                    color: "red",
                  },
                  // {
                  //   key: "download",
                  //   icon: <ArrowDownOnSquareIcon className="h-4 w-4" />,
                  //   title: "Download to your computer",
                  //   onClick: () => {},
                  // },
                ],
                { zIndex: 1000, shadow: "md", borderRadius: "md" }
              )}
            >
              <TranslationItem openRecord={openRecord} />
            </Link>
          ))}
        </li>
      </ul>
    </>
  )
}
