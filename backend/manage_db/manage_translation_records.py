import os
import json
import random
from typing import Optional, List, Tuple, AnyStr
from uuid import UUID

import schemas, models


async def get_all_translation_records_of_user(
        user_doc: models.UserDocument
) -> List:
    """
    """
    translation_records =  [ 
        await models.TranslationRecordDocument.find_one({"uuid": translation_record_uuid})
               for translation_record_uuid in user_doc.translation_records_uuids]
    return translation_records


async def open_record_of_translation_id(
        user_doc: models.UserDocument,
        translation_id: str,
) -> models.TranslationRecordDocument:
    """
    """
    record_doc =  await models.TranslationRecordDocument.find_one(
        models.TranslationRecordDocument.user_uuid==user_doc.uuid, 
        models.TranslationRecordDocument.id==translation_id)
    if (not record_doc):
        record_doc = models.TranslationRecordDocument(id=translation_id,
                                                      title="Translation-"+translation_id,
                                                      user_uuid=user_doc.uuid,
                                                      )
        await record_doc.create()
        print("Records UUIDs Before Create: ", user_doc.translation_records_uuids)
        user_doc.translation_records_uuids.append(record_doc.uuid)
        await user_doc.save()
        print("Records UUIDs After Create: ", user_doc.translation_records_uuids)

    return record_doc


async def delete_translation_record_uuid(
        user_doc: models.UserDocument,
        translation_record_uuid: UUID
) -> bool:
    """
    """
    await models.TranslationRecordDocument.find_one(
        models.TranslationRecordDocument.user_uuid==user_doc.uuid, 
        models.TranslationRecordDocument.uuid==translation_record_uuid).delete()
    print("Translation Record ", translation_record_uuid, " deleted!")

    print("Current User: ", user_doc.first_name, user_doc.last_name)
    print("Records UUIDs Before Delete: ", user_doc.translation_records_uuids)
    user_doc.translation_records_uuids.remove(translation_record_uuid)
    await user_doc.save()
    print("Records UUIDs After Delete: ", user_doc.translation_records_uuids)
    return True


async def delete_item_in_translation_record(
        user_doc: models.UserDocument,
        translation_record_uuid: UUID,
        record_item_uuid: UUID,
) -> bool:

    record = await models.TranslationRecordDocument.find_one({
        "uuid": translation_record_uuid, 
        "user_uuid": user_doc.uuid})

    item_deleted = [item for item in record.items 
                    if item.uuid==record_item_uuid]
    print("item_deleted:", item_deleted)
    if item_deleted:
        record.items.remove(item_deleted[0])
    await record.save()

    return True


################################################################################################
# Save translations for retrieval later on
async def save_translation_record_item(
        translation_record_uuid: UUID, 
        translation_item: schemas.TranslationItemSchema
) -> schemas.TranslationItemSchema:
    print("Storing Translation Item...")

    translation_record_doc = await models.TranslationRecordDocument.find_one({
        "uuid": translation_record_uuid})
    
    # Add item to doc
    translation_record_doc.items.append(translation_item)
    await translation_record_doc.save()
    # print(translation_record_doc.items[-1])

    return translation_record_doc.items[-1]


