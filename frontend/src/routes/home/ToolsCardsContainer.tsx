import { NavLink } from "react-router-dom"
// import { Tooltip as ReactTooltip } from "react-tooltip"
// import { AssistantSchema } from "../../schemas/assistant"

import { tools } from "../../constants/tools.constants"

export default function ToolsCardsContainer() {
  // console.log("assistants: ", assistants)

  return (
    <section className="max-w-7xl mx-auto dark:brightness-50">
      <div className="flex flex-wrap overflow-y-auto justify-start ">
        {tools.map((tool: any, index: any) => (
          <div
            className="w-1/2 sm:w-1/3 lg:w-1/4 
            h-auto p-1 flex"
            key={tool.name + "-card-on-home"}
          >
            <NavLink
              to={tool.href}
              className={`w-full p-1 rounded-xl  shadow-md
                          overflow-hidden  h-auto
                          border border-gray-200 dark:border-gray-800
                          bg-red-100 dark:bg-yellow-950
                          flex flex-col items-center`}
              key={tool.name + "-on-home"}
            >
              <img
                src={"" + tool.avatar}
                alt="image"
                className="object-cover w-full aspect-[4/3] rounded-lg rounded-b-none"
                data-tooltip-id={index}
              />
              <div className="w-full h-auto justify-start">
                <div className="flex justify-start items-center py-1">
                  <img
                    src={"" + tool.icon}
                    alt=""
                    className="object-cover w-5 h-5 p-1 me-2"
                    data-tooltip-id={index}
                  />
                  <h3>
                    <span
                      // href={assistant.href}
                      className=" font-semibold
                                  text-xs
                                  block
                                 
                                "
                    >
                      {tool.name}
                    </span>
                  </h3>
                </div>

                <p
                  className=" text-xs
                              text-gray-500"
                >
                  {tool.description}
                </p>
              </div>
            </NavLink>
            {/* <ReactTooltip
              id={index}
              place="bottom"
              content={"Use " + tool.name}
            /> */}
          </div>
        ))}
      </div>
    </section>
  )
}
