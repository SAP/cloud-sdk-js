import {
  EntitySerializer,
  EntityDeserializer,
  entitySerializer,
  entityDeserializer,
  serializersCommon,
  deserializersCommon,
  EdmTypeShared,
  EdmTypeCommon
} from '../src';

export const commonEntitySerializer: EntitySerializer =
  entitySerializer(tsToEdm);

function tsToEdm(value: any, edmType: EdmTypeShared<'any'>): any {
  if (value === null) {
    return 'null';
  }
  if (serializersCommon[edmType]) {
    return serializersCommon[edmType](value);
  }
  throw new Error(
    `You try to serialize Edm type ${edmType} which is version specific.`
  );
}

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

export const commonExtractODataEtag = () => {
  throw new Error('Etag not implemented for test');
};
const commonExtractOneToManyLink = () => {
  throw new Error('Extract one to many link not implemented for test');
};

export const commonEntityDeserializer: EntityDeserializer = entityDeserializer(
  edmToTs,
  commonExtractODataEtag,
  commonExtractOneToManyLink
);
