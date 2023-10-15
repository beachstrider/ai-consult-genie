import { CheckCircleIcon } from "@heroicons/react/24/outline"

import { AssistantSchema } from "../../schemas/assistant.schema"

function joinClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  assistant: AssistantSchema | undefined
  isCardView: Boolean
  setIsCardView: any
}

export default function AssistantCard({
  assistant,
  isCardView,
  setIsCardView,
}: Props) {
  return (
    <div
      className={joinClassNames(
        isCardView ? "w-full xl:!w-[450px]" : "hidden xl:!flex w-[500px]",
        "flex bg-[#F7F5F7] dark:bg-gray-900 text-black dark:text-white overflow-auto"
      )}
    >
      <div
        className="flex flex-col h-full w-full pt-4 px-4 cursor-pointer"
        onClick={() => {
          setIsCardView(false)
        }}
      >
        {/* XMarkIcon */}
        <div
          className="ps-2 flex justify-between"
          onClick={() => {
            setIsCardView(false)
          }}
        >
          <h2 className="my-2">
            <span
              // href={assistant.href}
              className=" font-semibold  text-center text-xl block"
            >
              {/* Who am I ? */}
            </span>
          </h2>

          <CheckCircleIcon className="h-5 w-5" />
        </div>

        {/* <div
          className="lg:hidden ps-2 py-2"
          onClick={() => {
            setIsCardView(!isCardView)
          }}
        >
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        </div> */}

        <div
          className="w-full h-auto p-2 rounded-3xl 
                    flex flex-col items-center justify-center mt-8"
        >
          <img
            src={"" + assistant!.avatar}
            alt="image"
            className="object-cover w-[300px] aspect-[3/3] rounded-2xl"
          />
        </div>
        <div className="w-full justify-center">
          <h3 className="my-2">
            <span
              // href={assistant.href}
              className=" font-semibold  text-center text-lg block"
            >
              {/* {assistant.persona} {assistant.name} */}
              {assistant!.persona}
            </span>
          </h3>

          {/* <h4 className="w-full max-w-[400px] mx-auto">
            <div className="m-2 break-word text-sm mb-2 text-justify">
              {"Age: "} {assistant!.age}
            </div>
          </h4>

          <h4 className="w-full max-w-[400px] mx-auto">
            <div className="m-2 break-word text-sm mb-2 text-justify">
              {"Gender: "} {assistant!.gender}
            </div>
          </h4>

          <h4 className="w-full max-w-[400px] mx-auto">
            <div className="m-2 break-word text-sm mb-2 text-justify">
              {"Voice: "} {assistant!.voice}
            </div>
          </h4>

          <h4 className="w-full max-w-[400px] mx-auto">
            <div className="m-2 break-word text-sm mb-1 text-justify">
              {"Introduction: "}
            </div>
          </h4> */}
          <h4 className="w-full max-w-[400px] mx-auto">
            <div className="m-2 break-word text-sm mb-16 text-justify">
              {assistant!.description}
            </div>
          </h4>
        </div>
      </div>
    </div>
  )
}
