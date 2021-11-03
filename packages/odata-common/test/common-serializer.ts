import {
  EdmTypeShared,
  EntitySerializer,
  entitySerializer,
  serializersCommon
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
