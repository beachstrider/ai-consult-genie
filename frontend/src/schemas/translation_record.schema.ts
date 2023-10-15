export interface  TranslationItemSchema  {
  uuid?: string
  time_stamp: any
  side: string

  original_language_name: string
  original_language_localname: string
  original_text: string

  target_language_name: string
  target_language_localname: string
  translation_text: string
}

export interface TranslationRecordsListItemSchema {
  uuid?: string
  id: string
  title: string
  user_uuid?: string 
}  

export interface TranslationRecordGetSchema {
  uuid?: string
  id: string
  title: string
  user_uuid?: string

  voice?: string
  items: TranslationItemSchema[]
  
}  

export interface DeleteTranslationRecordRequestSchema {
  translation_record_uuid: string | undefined
  
}  

export interface DeleteRecordItemRequestSchema {
  translation_record_uuid: string | undefined
  record_item_uuid: string | undefined  
}  

