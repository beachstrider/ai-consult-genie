import { Link } from "react-router-dom"
import AssistantItem from "./AssistantItem"
import { useContextMenu } from "mantine-contextmenu"
import {
  TrashIcon,
  // DocumentDuplicateIcon,
  // ArrowDownOnSquareIcon,
} from "@heroicons/react/24/outline"

import { AssistantSchema } from "../../schemas/assistant.schema"

type Props = {
  contacts: Array<AssistantSchema>
  nonContacts: Array<AssistantSchema>
  currentAssistant: any
  deleteAssistanceRoom: any
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

export default function AssistantsList({
  contacts,
  nonContacts,
  currentAssistant,
  deleteAssistanceRoom,
}: Props) {
  ////////////////////////////////////////////////////////////////////////////////////
  const showContextMenu = useContextMenu()

  ////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <ul className="overflow-y-auto w-full flex-1">
        {contacts.length > 0 && (
          <h2
            className="mx-4 my-2 pt-4 font-bold text-xs
                      text-gray-500"
          >
            Contacted ({contacts.length})
          </h2>
        )}

        <li className="">
          {contacts.map((contact: any, index: any) => (
            <Link
              to={
                "/assistants/" +
                contact.persona.replaceAll(" ", "_").toLowerCase()
              }
              key={index}
              className={classNames(
                contact.uuid == currentAssistant?.uuid
                  ? "bg-white dark:bg-black font-medium"
                  : "transition duration-150 ease-in-out cursor-pointer hover:bg-white dark:hover:bg-black hover:font-medium ",
                "flex text-md hover:bg-dark-lighten relative items-stretch gap-2 py-2 px-2 transition duration-300 rounded-lg m-3 "
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
                      deleteAssistanceRoom(contact)
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
              <AssistantItem assistant={contact} />
            </Link>
          ))}
        </li>
        {nonContacts.length > 0 && (
          <h2
            className="mx-4 my-2 pt-4 font-bold text-xs
                      text-gray-500"
          >
            Noncontacted ({nonContacts.length})
          </h2>
        )}
        <li>
          {nonContacts.map((nonContact: any, index: any) => (
            <Link
              to={
                "/assistants/" +
                nonContact.persona.replaceAll(" ", "_").toLowerCase()
              }
              key={index}
              className={classNames(
                nonContact.uuid == currentAssistant?.uuid
                  ? "bg-white dark:bg-black font-medium"
                  : "transition duration-150 ease-in-out cursor-pointer hover:bg-white dark:hover:bg-black hover:font-medium ",
                "flex text-md hover:bg-dark-lighten relative items-stretch gap-2 py-2 px-2 transition duration-300 rounded-lg m-3 "
              )}
            >
              <AssistantItem assistant={nonContact} />
            </Link>
          ))}
        </li>
      </ul>
    </>
  )
}
