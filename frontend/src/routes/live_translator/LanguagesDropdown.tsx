/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckCircleIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline"

import { languages_v2 } from "../../constants/languages.constants"

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  color: string
  setLanguage: any
}

export default function LanguagesDropdown({ color, setLanguage }: Props) {
  const [selected, setSelected] = useState(languages_v2[0])

  useEffect(() => {
    setLanguage(selected)
  }, [selected])

  // console.log("selected : ", selected)

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          {/* <Listbox.Label className="block text-sm font-medium text-gray-700">
            Assigned to
          </Listbox.Label> */}
          <div className="relative w-[160px]">
            <Listbox.Button
              className="relative w-full pl-2 pr-4 py-2 
              text-left 
              rounded-md shadow-sm
            text-white
              cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <span className="flex items-center">
                {/* <img
                  src={selected.avatar}
                  alt=""
                  className="flex-shrink-0 h-6 w-8 rounded-md border border-gray-500"
                /> */}

                <span className="ml-1 block truncate">
                  {selected.name + " (" + selected.local_name + ")"}
                </span>
              </span>
              <span className="ml-1 absolute inset-y-0 right-0 flex items-center pr-0 pointer-events-none">
                <ChevronUpDownIcon className="h-6 w-6" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute mt-1 w-full shadow-lg max-h-96 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm
                bg-white text-black dark:bg-black dark:text-white
                border border-gray-300 dark:border-gray-700 
                "
              >
                {languages_v2.map((language) => (
                  <Listbox.Option
                    key={language.code}
                    className={({ active }) =>
                      classNames(
                        active
                          ? color == "blue"
                            ? "bg-blue-500 dark:bg-blue-950 text-white"
                            : color == "green"
                            ? "bg-green-500 dark:bg-green-950 text-white"
                            : ""
                          : "",
                        "cursor-default select-none relative py-2 pl-2 pr-4"
                      )
                    }
                    value={language}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-start">
                          {/* <img
                            src={language.avatar}
                            alt=""
                            className="flex-shrink-0 h-6 w-8 rounded-md border border-gray-500"
                          /> */}
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-1 block truncate"
                            )}
                          >
                            {language.name + " (" + language.local_name + ")"}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active
                                ? "text-white"
                                : "text-black dark:text-white",
                              "absolute inset-y-0 right-0 flex items-center pr-0"
                            )}
                          >
                            <CheckCircleIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
