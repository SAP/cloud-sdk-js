/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { entityDeserializer } from '../common/entity-deserializer';
import { edmToTs } from './payload-value-converter';
const deserializer = entityDeserializer(edmToTs);

export const extractCustomFields = deserializer.extractCustomFields;
export const deserializeEntity = deserializer.deserializeEntity;
