import moment from 'moment';
import { v4 as uuid } from 'uuid';

export function createOriginalTestEntityData1() {
  return {
    KeyPropertyGuid: uuid(),
    KeyPropertyString: 'ABCDE',
    StringProperty: 'FGHIJ',
    BooleanProperty: false,
    Int16Property: 13
  };
}

export function createOriginalTestEntityData2() {
  return {
    KeyPropertyGuid: uuid(),
    KeyPropertyString: '12345',
    StringProperty: '6789',
    BooleanProperty: true,
    Int16Property: 42,
    EnumProperty: 'Enum1'
  };
}

export function createOriginalTestEntityDataV4_1() {
  return {
    KeyPropertyGuid: uuid(),
    KeyPropertyString: 'ABCDE',
    KeyDateProperty: moment.utc('2023-05-05', 'Y-MM-DD', true),
    StringProperty: 'FGHIJ',
    BooleanProperty: false,
    Int16Property: 13
  };
}

export function createOriginalTestEntityDataV4_2() {
  return {
    KeyPropertyGuid: uuid(),
    KeyPropertyString: '12345',
    KeyDateProperty: moment.utc('2023-05-05', 'Y-MM-DD', true),
    StringProperty: '6789',
    BooleanProperty: true,
    Int16Property: 42,
    EnumProperty: 'Enum1'
  };
}

export function createOriginalTestEntityDataWithLinks() {
  return {
    KeyPropertyGuid: uuid(),
    KeyPropertyString: 'abcde',
    to_SingleLink: {
      KeyProperty: 'abc'
    },
    to_MultiLink: [
      {
        KeyProperty: 'def'
      }
    ]
  };
}
