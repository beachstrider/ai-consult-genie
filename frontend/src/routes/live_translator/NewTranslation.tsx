import { Link } from "react-router-dom"
import { format } from "date-fns"

export default function NewTranslation() {
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="px-3 py-1">
        <div className="relative">
          <Link
            to={
              "/live_translator/" +
              format(new Date(), "MMMdd-p-Y").replaceAll(" ", "")
            }
            id="new_translation"
            className="py-2 pr-3 w-full text-xs rounded-lg flex justify-center
                      border border-gray-300 dark:border-gray-600 dark:placeholder-gray-400
                      hover:outline-none hover:ring-blue-500 hover:border-blue-500 hover:text-blue-500"
            //   onChange={(e) => handleSearch(e.target.value)}
          >
            New Translation
          </Link>
        </div>
      </div>
    </>
  )
}
