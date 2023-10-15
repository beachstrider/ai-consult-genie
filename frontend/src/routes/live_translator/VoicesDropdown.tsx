/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckCircleIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline"

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  voices_available: any
  voice: any
  setVoice: any
  disabled: boolean
}

export default function VoicesDropdown({
  voices_available,
  voice,
  setVoice,
  disabled,
}: Props) {
  const [selected, setSelected] = useState(voice)

  useEffect(() => {
    setVoice(selected)
  }, [selected])

  // console.log("selected : ", selected)

  return (
    <Listbox value={selected} onChange={setSelected} disabled={disabled}>
      {({ open }) => (
        <>
          {/* <Listbox.Label className="block text-sm font-medium text-gray-700">
            Assigned to
          </Listbox.Label> */}
          <div className="relative w-[120px]">
            <Listbox.Button
              className="relative w-full pl-2 pr-4 py-1 
              text-left 
              rounded-md shadow-sm
            text-white
              cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <span className="flex items-center">
                {/* <img
                  src={selected.avatar}
                  alt=""
                  className="flex-shrink-0 h-6 w-8 rounded-md border border-gray-500"
                /> */}
                <span className="block truncate">{selected.name}</span>
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
                className="absolute mt-1 w-full shadow-lg max-h-96 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm
                bg-white text-black dark:bg-black dark:text-white
                border border-gray-300 dark:border-gray-700 
                "
              >
                {voices_available.map((voice_sel: any) => (
                  <Listbox.Option
                    key={voice_sel.voice_id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-blue-500 dark:bg-blue-900 text-white" : "",
                        "cursor-default select-none relative py-2 pl-2 pr-6"
                      )
                    }
                    value={voice_sel}
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
                              "block truncate"
                            )}
                          >
                            {voice_sel.name}
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
