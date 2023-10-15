import { AssistantSchema } from "../../schemas/assistant.schema"

type AssistantRoomHeader_Props = {
  currentAssistant: AssistantSchema | undefined
}

export default function AssistanceRoomHeader({
  currentAssistant,
}: AssistantRoomHeader_Props) {
  return (
    <div className="relative flex items-center">
      <img
        className="w-10 h-10 rounded-full object-cover  border border-gray-400 dark:border-gray-600"
        src={"" + currentAssistant?.avatar}
        alt="Avatar"
      />
      <span className="bottom-0 left-6 absolute  w-3 h-3 bg-green-500 border-2 border-white dark:border-black rounded-full"></span>
      <span className="block ml-2 text-lg font-medium ">
        {/* {currentAssistant?.persona} {currentAssistant?.name} */}
        {currentAssistant?.persona}
      </span>
    </div>
  )
}
