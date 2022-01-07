import { v4 as uuid } from 'uuid';
import { testService } from '@sap-cloud-sdk/test-services/v2/test-service';

const { testEntityApi } = testService();

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
