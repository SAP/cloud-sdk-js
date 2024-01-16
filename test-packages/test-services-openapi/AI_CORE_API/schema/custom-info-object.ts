/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { GenericName2 } from './generic-name-2';
import type { CustomInfoObjectData } from './custom-info-object-data';
/**
 * large object which provides rendering/semantic information regarding certain metric for consuming application or can be complex metrics in JSON format
 * @example {
 *   "name": "Confusion Matrix",
 *   "value": "[{'Predicted': 'False',  'Actual': 'False','value': 34},{'Predicted': 'False','Actual': 'True',  'value': 124}, {'Predicted': 'True','Actual': 'False','value': 165},{  'Predicted': 'True','Actual': 'True','value': 36}]"
 * }
 */
export type CustomInfoObject =
  | {
      name: GenericName2;
      value: CustomInfoObjectData;
    }
  | Record<string, any>;
