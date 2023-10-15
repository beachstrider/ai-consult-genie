import { AssistantSchema } from "../../schemas/assistant.schema"

type Props = {
  assistant: AssistantSchema | undefined
}

export default function AssistantItem({ assistant }: Props) {
  return (
    <div className="relative flex items-center">
      <img
        className="w-10 h-10 rounded-full object-cover border border-gray-400 dark:border-gray-600"
        src={"" + assistant?.avatar}
        alt="Avatar"
      />
      <span className="block ml-2">
        {/* {assistant?.persona} {assistant?.name} */}
        {assistant?.persona}
      </span>
      {/* {onlineAssistantsId?.includes(assistant?.uid) ? ( */}
      <span className="bottom-0 left-6 absolute  w-3 h-3 bg-green-500 border-2 border-white dark:border-black rounded-full"></span>
      {/* ) : (
        <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-gray-400 border-2 border-white rounded-full"></span>
      )} */}
    </div>
  )
}
