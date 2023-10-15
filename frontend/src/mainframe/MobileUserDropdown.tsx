import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { NavLink } from "react-router-dom"
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"

import { UserSchema } from "../schemas/user.schema"

function joinClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

import { userNavigations, logout } from "../constants/nav.constants"

interface Props {
  currentUser: UserSchema | undefined
  setModal: any
}

//////////////////////////////////////////////////////////////////////////
export default function MobileUserDropdown({ currentUser, setModal }: Props) {
  return (
    <div className="flex lg:hidden z-40 m-1">
      {/* if not logged in */}
      {!currentUser && (
        <NavLink to="/login">
          <div className="flex grow">
            <button
              className="relative inline-flex items-center justify-center p-1 rounded-full  w-6 h-6
                        bg-gray-500
                        text-sm font-medium text-white dark:text-black
                        hover:ring-offset-2 hover:ring-1 hover:text-white"
            >
              {/* <span> Log </span> */}
              <ArrowLeftOnRectangleIcon className="h-4 w-4 rotate-180" />
              {/* <span className="text-white text-md px-2">Start</span> */}
            </button>
          </div>
        </NavLink>
      )}

      {/* if logged in */}
      {currentUser && (
        <>
          {/* Mobile user profile dropdown*/}
          <Menu as="div" className="ml-3 relative">
            {({ open }) => (
              <>
                <div>
                  <Menu.Button
                    className="max-w-xs flex items-center text-sm rounded-full 
                  hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-7 w-7 rounded-full brightness-100"
                      src={currentUser?.avatar}
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-500"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-95 scale-100"
                  leave="transition ease-in duration-500"
                  leaveFrom="transform opacity-95 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    static
                    className="origin-top-right absolute right-0 mt-2 w-[220px] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-500 focus:outline-none
                    bg-gradient-to-b from-[#59544E] via-[#58565C] to-[#4D595F] 
                    dark:bg-gradient-to-b dark:from-[#1D1712] dark:via-[#19151B] dark:to-[#121F26]
                    text-white"
                  >
                    <div className="py-4">
                      <div className="ml-4">
                        <div className="text-base font-medium">
                          {currentUser?.first_name} {currentUser?.last_name}
                        </div>
                        <div className="text-sm font-light">
                          {currentUser?.email}
                        </div>
                      </div>
                    </div>
                    <div className="px-1">
                      {userNavigations.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            joinClassNames(
                              isActive
                                ? "bg-gradient-to-r from-[#6E686B] via-[#878487] to-[#6E686B]         dark:bg-gradient-to-r dark:from-[#3B3636] dark:via-[#615E5E] dark:to-[#3B3636]"
                                : "hover:bg-gradient-to-r from-[#6E686B] via-[#878487] to-[#6E686B]  hover:dark:bg-gradient-to-r dark:from-[#3B3636] dark:via-[#615E5E] dark:to-[#3B3636]",
                              "group flex items-center px-4 py-4 text-sm font-medium rounded-full transition duration-300 m-3"
                            )
                          }
                        >
                          <img
                            className="mr-3 h-6 w-6"
                            src={item.icon}
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      ))}

                      {/* Logout */}
                      <div className="px-4 py-1 space-y-1 hover:bg-gradient-to-r from-[#6E686B] via-[#878487] to-[#6E686B] m-3 rounded-full  hover:dark:bg-gradient-to-r dark:from-[#3B3636] dark:via-[#615E5E] dark:to-[#3B3636]">
                        <button
                          className="flex items-center py-2 text-sm font-medium first-letter"
                          onClick={() => setModal(true)}
                        >
                          <img
                            className="mr-3 h-6 w-6"
                            src={logout.icon}
                            aria-hidden="true"
                          />
                          {logout.name}
                        </button>
                      </div>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </>
      )}
    </div>
  )
}
