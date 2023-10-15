import { FAQs_Groups } from "../../constants/faqs.constants"
import FAQsSection from "./FAQsSection"

const faqs_groups = FAQs_Groups

export default function Help_() {
  console.log(faqs_groups)

  return (
    <main className="flex-1 relative z-0 overflow-y-auto bg-white text-black dark:bg-gray-900 dark:text-white rounded-xl ring-inset ring-4 ring-blue-900">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-b-2 border-gray-500">
          <h1 className="text-2xl font-semibold">Help and FAQs</h1>
        </div>

        {faqs_groups.map(({ item, index }: any) => (
          <FAQsSection faqs={item} key={index} />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="py-4 ">
            <div className="border-4 border-dashed border-gray-500 rounded-lg h-96" />
          </div>
          {/* /End replace */}
        </div>
      </div>
    </main>
  )
}
