import React from "react"
import { twMerge } from "tailwind-merge"
import Spinner from "./Spinner"

type LoadingButtonProps = {
  loading: boolean
  btnColor?: string
  textColor?: string
  children: React.ReactNode
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  textColor = "text-white",
  btnColor = "bg-yellow-600",
  children,
  loading = false,
}) => {
  return (
    <button
      type="submit"
      className={twMerge(
        `w-full py-2 font-semibold rounded-lg outline-none border-none flex justify-center shadow-sm text-md text-white hover:ring-2 hover:ring-blue-500`,
        `${btnColor} ${loading && "bg-[#ccc]"}`
      )}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <Spinner />
          <span className="inline-block">{children}</span>
        </div>
      ) : (
        <span className={`${textColor}`}>{children}</span>
      )}
    </button>
  )
}
