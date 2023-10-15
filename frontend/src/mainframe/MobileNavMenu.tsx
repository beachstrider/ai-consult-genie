import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { NavLink } from "react-router-dom"
import { XMarkIcon } from "@heroicons/react/24/outline"

function joinClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

import { navigations } from "../constants/nav.constants"

interface Props {
  mobileMenuOpen: boolean
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

//////////////////////////////////////////////////////////////////////////
export default function MobileNavMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
}: Props) {
  return (
    <div>
      {/* Mobile Navigation Menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-opacity-75" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-500 transform"
            enterFrom="-translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-95"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="translate-x-0 opacity-95"
            leaveTo="-translate-x-full opacity-0"
          >
            <div
              className="relative flex flex-col max-w-sm w-64 pt-2 pb-4
              bg-gradient-to-b from-[#59544E] via-[#58565C] to-[#4D595F]
              dark:bg-gradient-to-b dark:from-[#1D1712] dark:via-[#19151B] dark:to-[#121F26]
            text-gray-300"
            >
              {/* <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child> */}

              {/* Mobile Navigation Menu close icon */}
              <button
                className="mx-7 my-3 flex items-center justify-center h-6 w-6 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* <div className="flex-shrink-0 flex items-center px-4">
                <img className="h-8 w-auto" src={logo_img} alt="Workflow" />
              </div> */}

              {/* Mobile Navigation Menu Items */}
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                {/* Navigation */}
                <nav className="px-3 mt-6 mx-1">
                  <div className="space-y-1">
                    {navigations.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          joinClassNames(
                            isActive
                              ? "bg-gradient-to-r from-[#6E686B] via-[#878487] to-[#6E686B] dark:bg-gradient-to-r dark:from-[#3B3636] dark:via-[#615E5E] dark:to-[#3B3636]"
                              : "hover:bg-gradient-to-r from-[#6E686B] via-[#878487] to-[#6E686B]  hover:dark:bg-gradient-to-r dark:from-[#3B3636] dark:via-[#615E5E] dark:to-[#3B3636]",
                            " group flex items-center px-4 py-4 text-sm font-medium rounded-full transition duration-300"
                          )
                        }
                        // aria-current={item.current ? "page" : undefined}
                      >
                        {/* <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 h-6 w-6"
                      )}
                      aria-hidden="true"
                    /> */}
                        <img
                          className="mr-3 h-6 w-6"
                          src={item.icon}
                          alt="Icon image"
                          aria-hidden="true"
                        />
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </Transition.Child>

          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
