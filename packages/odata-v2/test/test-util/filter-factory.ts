import { v4 as uuid } from 'uuid';
import { testEntityApi, testEntityApiCustom } from './test-data';

export const testFilterString = {
  filter: testEntityApi.schema.STRING_PROPERTY.equals('test'),
  odataStr: "StringProperty eq 'test'"
};

export const testFilterStringEncoding = {
  filter: testEntityApi.schema.STRING_PROPERTY.equals("?'&$"),
  odataStr: "StringProperty eq '?''&$'"
};

export const testFilterInt16 = {
  filter: testEntityApi.schema.INT_16_PROPERTY.equals(42),
  odataStr: 'Int16Property eq 42'
};

export const testFilterBoolean = {
  filter: testEntityApi.schema.BOOLEAN_PROPERTY.equals(true),
  odataStr: 'BooleanProperty eq true'
};

const id = uuid();

export const testFilterGuid = {
  filter: testEntityApi.schema.GUID_PROPERTY.equals(id),
  odataStr: `GuidProperty eq guid'${id}'`
};

export const testFilterSingleLink = {
  filter: testEntityApi.schema.TO_SINGLE_LINK.filter(
    testEntityApi.schema.TO_SINGLE_LINK._linkedEntityApi.schema.KEY_PROPERTY.equals(
      'test'
    ),
    testEntityApi.schema.TO_SINGLE_LINK._linkedEntityApi.schema.BOOLEAN_PROPERTY.equals(
      false
    )
  ),
  odataStr:
    "to_SingleLink/KeyProperty eq 'test' and to_SingleLink/BooleanProperty eq false"
};

export const testFilterStringCustom = {
  filter: testEntityApiCustom.schema.STRING_PROPERTY.equals(15),
  odataStr: "StringProperty eq 'URI(15)'"
};

export const testFilterSingleLinkCustom = {
  filter: testEntityApiCustom.schema.TO_SINGLE_LINK.filter(
    testEntityApiCustom.schema.TO_SINGLE_LINK._linkedEntityApi.schema.KEY_PROPERTY.equals(
      15
    )
  ),
  odataStr: "to_SingleLink/KeyProperty eq 'URI(15)'"
};
