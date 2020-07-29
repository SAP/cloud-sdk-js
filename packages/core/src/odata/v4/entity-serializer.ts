/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { entitySerializer } from '../common/entity-serializer';
import { tsToEdm } from './payload-value-converter';
const serializer = entitySerializer(tsToEdm);

export const serializeEntity = serializer.serializeEntity;
export const serializeComplexType = serializer.serializeComplexType;
export const serializeEntityNonCustomFields =
  serializer.serializeEntityNonCustomFields;
