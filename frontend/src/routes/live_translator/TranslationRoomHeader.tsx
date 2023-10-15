import { TranslationRecordsListItemSchema } from "../../schemas/translation_record.schema"

type Props = {
  currentTranslation: TranslationRecordsListItemSchema | undefined
}

export default function TranslationRoomHeader({ currentTranslation }: Props) {
  return (
    <div className="relative flex items-center">
      <img
        className="w-7 h-7 rounded-full object-cover  border border-gray-400 dark:border-gray-600 dark:invert"
        src="/assets/icons_new/translation-icon.svg"
        alt=""
      />
      <span className="block ml-2 text-lg font-medium ">
        {currentTranslation?.title}
      </span>
    </div>
  )
}
