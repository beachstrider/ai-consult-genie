import { useState } from "react"
import {
  useWindowSize,
  // useWindowWidth,
  // useWindowHeight,
} from "@react-hook/window-size/throttled"

import { useAuth } from "../contexts/auth"

// import MobileNavMenu from "./MobileNavMenu"
import NavSidebar from "./NavSidebar"
// import MobileScreenHeader from "./MobileScreenHeader"
// import MobileScreenHeader from "./MobileScreenHeader"

import Logout from "../routes/auth/Logout"

//////////////////////////////////////////////////////////////////////////
export default function MainFrame({ children }: any) {
  const { currentUser } = useAuth()
  const [modal, setModal] = useState(false)
  const [width_window, height_window] = useWindowSize()
  // const onlyWidth = useWindowWidth()
  // const onlyHeight = useWindowHeight()

  // const [isDarkMode, setIsDarkMode] = useState(false)
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // const [mobileHeaderView, setmobileHeaderView] = useState(true)

  // console.log(height_window, width_window)

  return (
    // <div className="h-screen flex flex-1 bg-[#e1dde1] dark:bg-[#181818]">
    <div
      // className="h-screen w-screen flex flex-1 bg-gradient-to-b from-[#1D1712] via-[#19151B] to-[#121F26]"
      className={`flex bg-gradient-to-b from-[#1D1712] via-[#19151B] to-[#121F26]`}
      style={{ height: `${height_window}px`, width: `${width_window}px` }}
      // dark:brightness-50
    >
      {/* Mobile Navigation Menu */}
      {/* <MobileNavMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      /> */}

      {/* Static sidebar for desktop */}
      <NavSidebar
        currentUser={currentUser}
        setModal={setModal}
        // isDarkMode={isDarkMode}
        // setIsDarkMode={setIsDarkMode}
      />

      {/* Main Column */}
      <div className="flex-1 relative">
        {/* Mobile Screen header */}
        {/* {<MobileScreenHeader currentUser={currentUser} setModal={setModal} />} */}

        <main
          className="flex lg:pe-8 lg:py-4
                absolute w-full h-full
                text-black dark:text-white"
        >
          <div className="flex w-full h-full lg:rounded-3xl overflow-hidden">
            {children}
          </div>
        </main>
      </div>

      {modal && <Logout modal={modal} setModal={setModal} />}
    </div>
  )
}
