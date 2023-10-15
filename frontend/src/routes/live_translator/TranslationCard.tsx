import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { TranslationRecordSchema } from "../../schemas/translation_record.schema"
import { tools } from "../../constants/tools.constants"

function joinClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  currentTranslation: TranslationRecordSchema | undefined
  isCardView: Boolean
  setIsCardView: any
}

export default function TranslationCard({
  currentTranslation,
  isCardView,
  setIsCardView,
}: Props) {
  return (
    <div
      className={joinClassNames(
        isCardView ? "w-full xl:!w-[450px]" : "hidden xl:!flex w-[500px]",
        "flex bg-[#F7F5F7] dark:bg-gray-900 text-black dark:text-white overflow-auto",
        "border-r border-gray-200 dark:border-gray-800"
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

        <div className="w-full justify-center">
          <h3 className="my-2">
            <span
              // href={assistant.href}
              className=" font-semibold  text-center text-lg block"
            >
              {/* {assistant.persona} {assistant.name} */}
              {currentTranslation!.name}
            </span>
          </h3>
          <h4 className="w-full max-w-[400px] mx-auto">
            {/* <div className="m-2  text-center text-md">[Description]</div> */}
            <div className="m-2 break-word text-sm mb-16 text-justify">
              {currentTranslation!.id}
            </div>
          </h4>
        </div>

        <div
          className="w-full h-auto p-2 rounded-3xl 
                    flex flex-col items-center justify-center mt-8"
        >
          <img
            src={tools[0].avatar}
            alt="image"
            className="object-cover w-[300px] aspect-[6/5] rounded-2xl border border-gray-500"
          />
        </div>

        <div className="w-full justify-center">
          <h3 className="my-2">
            <span
              // href={assistant.href}
              className=" font-semibold  text-center text-lg block"
            >
              {tools[0].name}
            </span>
          </h3>
          <h4 className="w-full max-w-[400px] mx-auto">
            {/* <div className="m-2  text-center text-md">[Description]</div> */}
            <div className="m-2 break-word text-sm mb-16 text-justify">
              {tools[0].description}
            </div>
          </h4>
        </div>
      </div>
    </div>
  )
}
