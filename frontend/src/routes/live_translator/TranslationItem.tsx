import { TranslationRecordsListItemSchema } from "../../schemas/translation_record.schema"

type Props = {
  openRecord: TranslationRecordsListItemSchema | undefined
}

export default function TranslationItem({ openRecord }: Props) {
  return (
    <div className="relative flex items-center">
      <img
        className="w-6 h-6 rounded-full object-cover  border border-gray-400 dark:border-gray-600 dark:invert"
        src="/assets/icons_new/translation-icon.svg"
        alt=""
      />
      <span className="block ml-2">
        {openRecord?.title == ""
          ? "Translation-" + openRecord.id
          : openRecord?.title}
      </span>
    </div>
  )
}
