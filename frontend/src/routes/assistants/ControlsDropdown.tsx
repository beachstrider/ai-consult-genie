import { Fragment } from "react"
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import { Switch, Menu, Transition } from "@headlessui/react"
import { Tooltip as ReactTooltip } from "react-tooltip"

interface Props {
  allowSpeaker: any
  setAllowSpeaker: any
  allowMic: any
  setAllowMic: any
  isAudioDirectly: any
  setIsAudioDirectly: any
  handleRoomsControlsChange: any
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

////////////////////////////////////////////////////////
export default function ControlsDropdown({
  allowSpeaker,
  setAllowSpeaker,
  allowMic,
  setAllowMic,
  isAudioDirectly,
  setIsAudioDirectly,
  handleRoomsControlsChange,
}: Props) {
  ////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  return (
    <Menu as="div" className="relative min-w-xs z-20">
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              className="h-8 w-8 flex items-center justify-center rounded-md 
                             hover:ring-2 hover:ring-blue-500 hover:text-blue-500 
                             focus:ring-2 focus:ring-blue-500 focus:text-blue-500"
              data-tooltip-id="rooms-controls"
            >
              <span className="sr-only">Open Controls menu</span>
              <AdjustmentsHorizontalIcon className="h-6 w-6" />
            </Menu.Button>
            <ReactTooltip
              id="rooms-controls"
              place="left"
              content="Room Controls"
            />
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 bg-[#F7F5F7] dark:bg-[#101010]
              rounded-md shadow-lg divide-y focus:outline-none"
            >
              <div className="px-1 w-52 h-80 flex justify-between">
                <ul className="m-5" onChange={handleRoomsControlsChange}>
                  {/* Speaker On/Off */}
                  <Switch.Group
                    as="li"
                    className="py-8 flex items-center justify-between"
                  >
                    <div className="flex">
                      <Switch.Label
                        as="p"
                        className="text-sm font-medium"
                        passive
                      >
                        Allow Speaker
                      </Switch.Label>
                    </div>
                    <Switch
                      checked={allowSpeaker}
                      onChange={setAllowSpeaker}
                      className={classNames(
                        allowSpeaker ? "bg-blue-500" : "bg-gray-500",
                        "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                      )}
                    >
                      <span
                        className={classNames(
                          allowSpeaker ? "translate-x-5" : "translate-x-0",
                          "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>

                  {/* Mic On/Off */}
                  <Switch.Group
                    as="li"
                    className="py-8 flex items-center justify-between"
                  >
                    <div className="flex">
                      <Switch.Label
                        as="p"
                        className="text-sm font-medium"
                        passive
                      >
                        Allow Mic
                      </Switch.Label>
                    </div>
                    <Switch
                      checked={allowMic}
                      onChange={setAllowMic}
                      className={classNames(
                        allowMic ? "bg-blue-500" : "bg-gray-500",
                        "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          allowMic ? "translate-x-5" : "translate-x-0",
                          "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>

                  {/* Audio Direct Send On/Off */}
                  {allowMic && (
                    <Switch.Group
                      as="li"
                      className="py-8 flex items-center justify-between"
                    >
                      <div className="flex">
                        <Switch.Label
                          as="p"
                          className="text-sm font-medium"
                          passive
                        >
                          Audio Directly
                        </Switch.Label>
                      </div>
                      <Switch
                        checked={isAudioDirectly}
                        onChange={setIsAudioDirectly}
                        className={classNames(
                          isAudioDirectly ? "bg-blue-500" : "bg-gray-500",
                          "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            isAudioDirectly ? "translate-x-5" : "translate-x-0",
                            "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                  )}
                </ul>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
