import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

export default function SearchTranslations({ handleSearch }: any) {
  return (
    <div className="px-3 py-1  border-b border-gray-200 dark:border-gray-700">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-2 flex items-center justify-center">
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="search"
          name="search"
          className=" block py-2 pl-10 pr-3 w-full text-xs rounded-lg 
                      border border-gray-300 
                      focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                     bg-white dark:bg-black dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="Search Translations"
          type="search"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  )
}
