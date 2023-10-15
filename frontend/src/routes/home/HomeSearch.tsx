import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
const HomeSearch = ({ handleSearch }: any) => {
  return (
    <div className="relative flex items-center rounded-full">
      <div className="absolute pl-3 flex items-center">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
      </div>
      <input
        type="search"
        id="search"
        className="block w-full p-2 pl-10 text-sm text-black dark:text-white bg-[#EEEDEE] dark:bg-gray-900 rounded-full border-transparent hover:border-transparent"
        placeholder="Type category or industry"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  )
}
export default HomeSearch
