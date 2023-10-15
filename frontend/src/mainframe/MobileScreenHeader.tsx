import { useState } from "react"
import { Bars3Icon } from "@heroicons/react/24/outline"

import MobileNavMenu from "./MobileNavMenu"
import MobileUserDropdown from "./MobileUserDropdown"

import { UserSchema } from "../schemas/user.schema"
import Logout from "../routes/auth/Logout"

interface Props {
  currentUser: UserSchema | undefined
  // setModal: React.Dispatch<React.SetStateAction<boolean>>
  // isDarkMode: boolean
  // setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

/////////////////////////////////////////////
export default function MobileScreenHeader({ currentUser }: Props) {
  // const { currentUser } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modal, setModal] = useState(false)

  return (
    <>
      <div className="">
        <MobileNavMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </div>

      <header className="fixed w-full bg-transparent z-30">
        <div className="flex justify-between items-center bg-transparent m-1">
          <button
            className="lg:hidden rounded-full w-6 h-6 flex items-center justify-center mx-1
                        bg-gray-500
                      text-white dark:text-black
                        focus:outline-none focus:ring focus:ring-inset focus:ring-gray-500 
                        hover:ring-offset-2 hover:ring-1 hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-4 w-4" aria-hidden="true" />
          </button>

          <MobileUserDropdown currentUser={currentUser} setModal={setModal} />
        </div>
      </header>
      {modal && <Logout modal={modal} setModal={setModal} />}
    </>
  )
}
