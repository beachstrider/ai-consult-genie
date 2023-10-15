// import { useState, useEffect } from "react";
// import { format } from "timeago.js";
import { format, differenceInCalendarDays } from "date-fns"
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
  message: any
  currentUser_uuid: any
  currentAssistant: any

  copyMessageText: any
  deleteRoomMessage: any
  // prevDate: any;
  // setPrevDate: any;
}

export default function MessageItem({
  message,
  currentUser_uuid,
  currentAssistant,

  copyMessageText,
  deleteRoomMessage,
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
          currentUser_uuid !== message.sender_uuid
            ? "justify-start"
            : "justify-end",
          "flex flex-col"
        )}
      >
        {/* {isNewDate && currentUser_uuid == message.sender_uuid && ( */}
        {currentUser_uuid == message.sender_uuid && (
          <div className="">
            {/* <span className="block text-xs text-gray-700 dark:text-gray-400 text-center pt-2 border-t border-gray-200 dark:border-gray-700"> */}
            <span className="block text-xs text-gray-700 dark:text-gray-400 text-end pt-2">
              {differenceInCalendarDays(
                Date.now(),
                new Date(message.time_stamp)
              ) == 0
                ? "Today"
                : differenceInCalendarDays(
                    Date.now(),
                    new Date(message.time_stamp)
                  ) == 1
                ? "Yesterday"
                : differenceInCalendarDays(
                    Date.now(),
                    new Date(message.time_stamp)
                  ).toString() + " days ago"}
              {", "}
              {format(new Date(message.time_stamp), "EEEE, MMM do Y")}
            </span>
          </div>
        )}
        <div
          className={classNames(
            currentUser_uuid !== message.sender_uuid
              ? "items-start"
              : "items-end pt-2",
            "flex flex-col "
          )}
        >
          <span
            className={classNames(
              currentUser_uuid !== message.sender_uuid
                ? "text-start"
                : "text-end",
              "block text-xs text-gray-700 dark:text-gray-400"
            )}
          >
            {currentUser_uuid !== message.sender_uuid
              ? currentAssistant.persona + " " + currentAssistant.name + ", "
              : "You, "}

            {format(new Date(message.time_stamp), "p")}
            {/* {currentUser_uuid == message.sender_uuid &&
              format(new Date(message.time_stamp), "PPPP, p")} */}
          </span>

          <div
            className={classNames(
              currentUser_uuid == message.sender_uuid
                ? // ? "text-start border border-gray-200 dark:border-gray-800 bg-gray-200 dark:bg-gray-800"
                  "text-start text-white bg-[#486CF6] dark:bg-blue-950 rounded-br-none"
                : // : "text-start border border-gray-200 dark:border-gray-800 mb-2",
                  "text-start bg-[#F0F0F0] dark:bg-[#1F1F1F] shadow-md mb-2 rounded-tl-none border border-gray-200 dark:border-gray-900",
              "relative max-w-3xl px-4 py-2 rounded-xl text-sm flex flex-col gap-3"
            )}
            onContextMenu={showContextMenu(
              [
                {
                  key: "copy-message-text",
                  icon: <DocumentDuplicateIcon className="h-4 w-4" />,
                  title: "Copy Message Text",
                  onClick: () => {
                    copyMessageText(message)
                  },
                  color: "blue",
                },

                { key: "divider" },

                {
                  key: "delete-message",
                  icon: <TrashIcon className="h-4 w-4" />,
                  title: "Delete This Message",
                  onClick: () => {
                    deleteRoomMessage(message)
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
            {message.text.split("\n").map((i: any, key: any) => (
              <span className="break-all" key={key}>
                {i}
              </span>
            ))}
          </div>
        </div>
      </li>
    </>
  )
}
