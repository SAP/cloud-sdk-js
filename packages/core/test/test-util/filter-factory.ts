/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import moment = require('moment');
import { v4 as uuid } from 'uuid';
import {
  TestEntity,
  TestEntitySingleLink
} from './test-services/v2/test-service';

export const testFilterString = {
  filter: TestEntity.STRING_PROPERTY.equals('test'),
  odataStr: "StringProperty eq 'test'"
};

export const testFilterInt16 = {
  filter: TestEntity.INT_16_PROPERTY.equals(42),
  odataStr: 'Int16Property eq 42'
};

export const testFilterBoolean = {
  filter: TestEntity.BOOLEAN_PROPERTY.equals(true),
  odataStr: 'BooleanProperty eq true'
};

const id = uuid();

export const testFilterGuid = {
  filter: TestEntity.GUID_PROPERTY.equals(id),
  odataStr: `GuidProperty eq guid'${id}'`
};

export const testFilterSingleLink = {
  filter: TestEntity.TO_SINGLE_LINK.filter(
    TestEntitySingleLink.KEY_PROPERTY.equals('test'),
    TestEntitySingleLink.BOOLEAN_PROPERTY.equals(false)
  ),
  odataStr:
    "to_SingleLink/KeyProperty eq 'test' and to_SingleLink/BooleanProperty eq false"
};
