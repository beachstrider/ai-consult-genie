import { NavLink } from "react-router-dom"
import { Tooltip as ReactTooltip } from "react-tooltip"
// import { AssistantSchema } from "../../schemas/assistant"

interface Props {
  assistants: any
}

export default function ImageCardsContainer({ assistants }: Props) {
  // console.log("assistants: ", assistants)

  return (
    <section className="max-w-4xl mx-auto dark:brightness-50">
      <div
        className="flex flex-wrap overflow-y-auto justify-center 
                      m-4 md:m-8"
      >
        {assistants.length > 0 &&
          assistants.map((assistant: any, index: any) => (
            <>
              <NavLink
                to={
                  "/assistants/" +
                  assistant.persona.replaceAll(" ", "_").toLowerCase()
                }
                className="w-1/2 sm:w-1/3 lg:w-1/4
                          h-auto p-2 rounded-3xl 
                          overflow-hidden 
                          border border-gray-200 dark:border-gray-800 shadow-md
                          bg-white dark:bg-[#0b0b0b]
                          flex flex-col items-center"
                key={index}
              >
                <img
                  src={"" + assistant.avatar}
                  alt="image"
                  className="object-cover w-full aspect-[3/3]  rounded-2xl"
                  data-tooltip-id={index}
                />
                <div className="w-full h-1/3 text-center justify-center">
                  <h3>
                    <span
                      // href={assistant.href}
                      className=" font-semibold
                                  text-sm
                                  block
                                 
                                "
                    >
                      {/* {assistant.persona} {assistant.name} */}
                      {assistant.persona}
                    </span>
                  </h3>
                  <p
                    className=" text-xs
                              text-yellow-500 "
                  >
                    {/* {card.description} */}
                  </p>
                </div>
              </NavLink>
              <ReactTooltip
                id={index}
                place="bottom"
                content={"Talk to " + assistant.persona}
              />
            </>
          ))}
      </div>
    </section>
  )
}
