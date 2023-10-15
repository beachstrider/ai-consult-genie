import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Tooltip as ReactTooltip } from "react-tooltip"

import { UserSchema } from "../schemas/user.schema"
import classNames from "classnames"

const logo_img = "/assets/logos/Logo-Vector.svg"

function joinClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

import {
  navigations,
  userNavigations,
  login,
  logout,
} from "../constants/nav.constants"

interface Props {
  currentUser: UserSchema | undefined
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  // isDarkMode: boolean
  // setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

//////////////////////////////////////////////////////////////////////////
export default function NavSidebar({
  currentUser,
  setModal,
}: // isDarkMode,
// setIsDarkMode,
Props) {
  // const DarkModeIcon = isDarkMode ? MoonIcon : SunIcon

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(true)
  // const CollapseIcon = isSidebarCollapsed
  //   ? ChevronDoubleRightIcon
  //   : ChevronDoubleLeftIcon

  return (
    <div
      className={classNames({
        // "hidden lg:flex lg:flex-shrink-0 fixed md:static md:translate-x-0 z-20 border-r border-gry-300 border-gray-800":
        "hidden lg:flex lg:flex-shrink-0 fixed md:static md:translate-x-0 z-20":
          true,
        "transition-all duration-0 ease-in-out": true,
        "w-[220px]": !isSidebarCollapsed,
        "w-[80px]": isSidebarCollapsed,
        " text-gray-300": true,
      })}
    >
      <div className="flex flex-col w-[220px] text-base">
        {/* collapse button */}
        <div
          className={classNames({
            "flex items-center transition-none": true,
            "justify-end": !isSidebarCollapsed,
            "justify-center": isSidebarCollapsed,
          })}
        >
          <button
            className={`${
              isSidebarCollapsed ? "" : ""
            } grid place-content-center w-5 h-5 rounded-md ml-10 mx-2 my-4`}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            data-tooltip-id="collapse-btn-tooltip"
          >
            <img
              className={`${isSidebarCollapsed ? "rotate-180" : ""} h-4 w-4`}
              src="/assets/icons_new/collapse.svg"
              alt="Icon image"
              aria-hidden="true"
            />
            {/* <CollapseIcon className="w-4 h-4" /> */}
          </button>
          <ReactTooltip
            id="collapse-btn-tooltip"
            place="right"
            content={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          />
        </div>

        <div
          className={joinClassNames(
            isSidebarCollapsed ? " flex-col" : "flex justify-start ml-2",
            "flex items-center flex-shrink-0 pt-2 pb-4 px-6"
          )}
        >
          <>
            <img
              className="h-6 w-auto"
              src={logo_img}
              alt="AdamoAI"
              data-tooltip-id="logo-on-sidebar-tooltip"
            />
            {!isSidebarCollapsed && (
              <span className="text-xl font-medium px-2">ADAMO</span>
            )}
            {isSidebarCollapsed && (
              <ReactTooltip
                id="logo-on-sidebar-tooltip"
                place="right"
                content="ADAMO"
              />
            )}
          </>
          <>
            {/* Color Theme Toggler */}
            {/* <button
              type="button"
              className="m-auto flex-shrink-0 rounded-full hover:outline-none hover:ring-2 hover:ring-offset-2 my-2"
              onClick={() => {
                setIsDarkMode(!isDarkMode)
              }}
              data-tooltip-id="theme-tooltip"
            >
              <span className="sr-only">Change Color Mode: Light / Dark</span>
              <DarkModeIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <ReactTooltip
              id="theme-tooltip"
              place="right"
              content="Change color theme: light/dark"
            /> */}

            {/* Notification */}
            {/* <NavLink to="#">
              <button
                type="button"
                className="m-auto flex-shrink-0 rounded-full hover:outline-none hover:ring-2 hover:ring-offset-2"
                data-tooltip-id="notification-tooltip"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              <ReactTooltip
                id="notification-tooltip"
                place="right"
                content="Notifications"
              />
            </NavLink> */}
          </>
        </div>

        {/* Sidebar navigations */}
        <div className="flex-1 flex flex-col overflow-y-auto mx-4">
          {/* navigations */}
          <nav className="mt-2" key={"NavSideBar"}>
            {/* <div className="space-y-1"> */}
            {navigations.map((item) => (
              <div key={item.href + "-on-NavSideBar"}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    joinClassNames(
                      isActive
                        ? "bg-gradient-to-r from-[#3B3636] via-[#615E5E] to-[#3B3636]"
                        : "hover:bg-gradient-to-r from-[#3B3636] via-[#615E5E] to-[#3B3636]",
                      " group flex items-center px-3 py-3 text-sm font-medium rounded-full space-y-1 my-1"
                    )
                  }
                  // aria-current={item.current ? "page" : undefined}
                  data-tooltip-id={item.name}
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
                    className="h-6 w-6"
                    src={item.icon}
                    alt="Icon image"
                    aria-hidden="true"
                  />
                  <span className="px-3">
                    {!isSidebarCollapsed && item.name}
                  </span>
                </NavLink>
                {isSidebarCollapsed && (
                  <ReactTooltip
                    id={item.name}
                    place="right"
                    content={item.name}
                  />
                )}
              </div>
            ))}
            {/* </div> */}
          </nav>

          {/* Sidebar user account navigations */}
          {/* if logged in */}
          {currentUser && (
            <>
              {/* User Navigation */}
              <nav className="mt-3 pt-3 border-t border-gray-600">
                <div className="space-y-1">
                  {userNavigations.map((item, key: any) => (
                    <div key={item.href + "-on-NavSideBar"}>
                      <NavLink
                        key={key}
                        to={item.href}
                        className={({ isActive }) =>
                          joinClassNames(
                            isActive
                              ? "bg-gradient-to-r from-[#3B3636] via-[#615E5E] to-[#3B3636]"
                              : "hover:bg-gradient-to-r from-[#3B3636] via-[#615E5E] to-[#3B3636]",
                            "group flex items-center px-3 py-3 text-sm font-medium rounded-full"
                          )
                        }
                        data-tooltip-id={item.name}
                      >
                        <img
                          className="mr-3 h-6 w-6"
                          src={item.icon}
                          aria-hidden="true"
                        />
                        <span>{!isSidebarCollapsed && item.name}</span>
                      </NavLink>
                      {isSidebarCollapsed && (
                        <ReactTooltip
                          id={item.name}
                          place="right"
                          content={item.name}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Logout */}
                <div className="space-y-1">
                  <div
                    className="flex items-center rounded-full px-3 py-3 text-sm font-medium 
                    hover:bg-gradient-to-r from-[#3B3636] via-[#615E5E] to-[#3B3636]"
                    onClick={() => setModal(true)}
                    data-tooltip-id={logout.name}
                  >
                    <img
                      className="mr-3 h-6 w-6"
                      src={logout.icon}
                      aria-hidden="true"
                    />
                    <span>{!isSidebarCollapsed && logout.name}</span>
                  </div>
                  {isSidebarCollapsed && (
                    <ReactTooltip
                      id={logout.name}
                      place="right"
                      content={logout.name}
                    />
                  )}
                </div>
              </nav>
            </>
          )}
        </div>

        {/*  */}
        <div className="bottom-4 flex items-center px-3 mt-1 mb-6 w-full">
          {!currentUser && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  joinClassNames(
                    isActive
                      ? "      bg-gradient-to-r from-[#3B3636] via-[#615E5E] to-[#3B3636]"
                      : "hover:bg-gradient-to-r from-[#3B3636] via-[#615E5E] to-[#3B3636]",
                    "flex-1 group flex items-center p-2 mx-1 rounded-md ring-1 ring-gray-300"
                  )
                }
                data-tooltip-id={"login"}
              >
                <button className="relative inline-flex items-center justify-center w-full p-1 ">
                  {/* <ArrowLeftOnRectangleIcon className="h-6 w-6 rotate-180" /> */}
                  <img
                    className="h-6 w-6 invert rotate-180"
                    src={login.icon}
                    aria-hidden="true"
                  />
                  {!isSidebarCollapsed && (
                    <span className=" text-sm font-medium  px-2">
                      {login.name}
                    </span>
                  )}
                </button>
              </NavLink>
              {isSidebarCollapsed && (
                <ReactTooltip id="login" place="right" content="Login" />
              )}
            </>
          )}

          {currentUser && (
            <div
              className="flex-1 group flex items-center m-1 p-2 rounded-xl overflow-hidden
                         bg-gradient-to-b from-[#33322C] via-[#30313A] to-[#273943]"
            >
              <div className="relative inline-flex items-center justify-start w-full">
                <div className="flex-shrink-0" data-tooltip-id={"user"}>
                  <img
                    className="h-8 w-8 rounded-full brightness-100"
                    src={currentUser.avatar}
                    alt="Current user Image"
                  />
                </div>
                {!isSidebarCollapsed && (
                  <div className="ml-2">
                    <div className="text-sm font-medium">
                      {currentUser?.first_name} {currentUser?.last_name}
                    </div>
                    <div className="text-xs font-normal">
                      {currentUser?.email}
                    </div>
                  </div>
                )}
              </div>
              {isSidebarCollapsed && (
                <ReactTooltip
                  id="user"
                  place="right"
                  content={
                    "You: " +
                    currentUser?.first_name +
                    " " +
                    currentUser?.last_name
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
