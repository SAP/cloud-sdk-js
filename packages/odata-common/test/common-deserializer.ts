import {
  deserializersCommon,
  EdmTypeCommon,
  EdmTypeShared,
  entityDeserializer,
  EntityDeserializer
} from '../src';

export const commonExtractODataEtag = () => {
  throw new Error('Etag not implemented for test');
};
const commonExtractOneToManyLink = () => {
  throw new Error('Extract one to many link not implemented for test');
};

function edmToTs(value: any, edmType: EdmTypeShared<'any'>): EdmTypeCommon {
  if (value === null || typeof value === 'undefined') {
    return value;
  }
  if (deserializersCommon[edmType]) {
    return deserializersCommon[edmType](value);
  }
  return value;

  throw new Error(
    `You try to deserialize Edm type ${edmType} which is version specific.`
  );
}
export const commonEntityDeserializer: EntityDeserializer = entityDeserializer(
  edmToTs,
  commonExtractODataEtag,
  commonExtractOneToManyLink
);
