// import { useState, useEffect } from "react";
// import { format, differenceInCalendarDays } from "date-fns"
import { format } from "date-fns"
import { useContextMenu } from "mantine-contextmenu"
import {
  TrashIcon,
  DocumentDuplicateIcon,
  // ArrowDownOnSquareIcon,
} from "@heroicons/react/24/outline"

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  recordItem: any

  copyOriginalText: any
  copyTranslationText: any
  deleteRecordItem: any
}

export default function MessageItem({
  recordItem,

  copyOriginalText,
  copyTranslationText,
  deleteRecordItem,
}: // prevDate,
// setPrevDate,
Props) {
  // const [isNewDate, setIsNewDate] = useState(false);
  // const currentDate = format(new Date(message.time_stamp), "PPPP");

  // useEffect(() => {
  //   if (currentDate !== prevDate) {
  //     setPrevDate(currentDate);
  //     setIsNewDate(true);
  //   } else {
  //     setIsNewDate(false);
  //   }
  // }, []);
  const showContextMenu = useContextMenu()

  return (
    <>
      <li
        className={classNames(
          recordItem.side == "left"
            ? "justify-start text-start"
            : "justify-end text-end",
          "flex flex-col"
        )}
      >
        <div
          className={classNames(
            recordItem.side == "left" ? "items-start" : "items-end",
            "flex flex-col "
          )}
        >
          <span
            className={classNames(
              recordItem.side == "left" ? "text-start" : "text-end",
              "block text-xs text-gray-700 dark:text-gray-400"
            )}
          >
            {format(new Date(recordItem.time_stamp), "pp, MMM do, Y")}
          </span>
          <span
            className={classNames(
              recordItem.side == "left" ? "text-start" : "text-end",
              "block text-xs text-gray-700 dark:text-gray-400"
            )}
          >
            {recordItem.original_language_name +
              "(" +
              recordItem.original_language_localname +
              ")->" +
              recordItem.target_language_name +
              "(" +
              recordItem.target_language_localname +
              ")"}
          </span>

          <div
            className={classNames(
              "text-white text-start relative max-w-3xl",
              recordItem.side == "left" ? " rounded-br-lg" : " rounded-bl-lg",
              " text-sm flex flex-col  rounded-t-lg"
              // " shadow-md shadow-gray-500"
            )}
            onContextMenu={showContextMenu(
              [
                {
                  key: "copy-original-text",
                  icon: <DocumentDuplicateIcon className="h-4 w-4" />,
                  title: "Copy Original Text",
                  onClick: () => {
                    copyOriginalText(recordItem)
                  },
                  color: "blue",
                },

                {
                  key: "copy-translation-text",
                  icon: <DocumentDuplicateIcon className="h-4 w-4" />,
                  title: "Copy Translation Text",
                  onClick: () => {
                    copyTranslationText(recordItem)
                  },
                  color: "blue",
                },

                { key: "divider" },

                {
                  key: "delete-item",
                  icon: <TrashIcon className="h-4 w-4" />,
                  title: "Delete This Item",
                  onClick: () => {
                    deleteRecordItem(recordItem)
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
            {recordItem.original_text.split("\n").map((i: any, key: any) => (
              <span
                className={classNames(
                  recordItem.side == "left"
                    ? "bg-blue-500 dark:bg-blue-900"
                    : "bg-green-500 dark:bg-green-900",
                  "rounded-t-lg px-3 pt-2 pb-1 break-all"
                )}
                key={key}
              >
                {i}
              </span>
            ))}
            {recordItem.translation_text.split("\n").map((i: any, key: any) => (
              <span
                className={classNames(
                  recordItem.side == "left"
                    ? "bg-green-500 dark:bg-green-900 rounded-br-lg"
                    : "bg-blue-500 dark:bg-blue-900 rounded-bl-lg",
                  "px-3 pt-1 pb-2 break-all"
                )}
                key={key}
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      </li>
    </>
  )
}
