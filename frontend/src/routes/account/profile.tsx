// import { useState, useEffect } from "react"

import MobileScreenHeader from "../../mainframe/MobileScreenHeader"

import { useAuth } from "../../contexts/auth"

export default function Profile() {
  const { currentUser } = useAuth()

  return (
    <main
      className="flex 
                w-full h-full 
                bg-white dark:bg-black 
                text-black dark:text-white"
    >
      {/* Mobile Screen header */}
      <MobileScreenHeader currentUser={currentUser} />
      {/* Now being develped ... */}
      <span className=""> Profile page will come soon ... </span>
    </main>
  )
}
