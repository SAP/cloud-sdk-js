/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
      import { SimpleTestEntity } from './simple-test-entity';
      import { TestEntity } from './test-entity';
      import { Except } from '@sap-cloud-sdk/core';
      export type ComplexTestEntity = {
      'referenceProperty'?: SimpleTestEntity;
      'arrayProperty'?: {
            'item'?: string;
          } | Record<string, any>[];
      'uniqueItemsProperty'?: Set<string>;
      'requiredPropertiesProperty'?: {
            'optionalProperty'?: string;
            'requiredProperty': string;
          } | Record<string, any>;
      'enumProperty'?: 'one' | 'two';
      'oneOfProperty'?: SimpleTestEntity | TestEntity;
      'allOfProperty'?: SimpleTestEntity & {
            'additionalProperty'?: string;
          } | Record<string, any>;
      'anyOfProperty'?: SimpleTestEntity | {
            'additionalProperty'?: string;
          } | Record<string, any>;
      'notProperty'?: Except<any, number>;
      'objectPropertyWithNoAdditionalProperties'?: {
            'specifiedProperty'?: string;
          };
      'objectPropertyWithAdditionalProperties'?: {
            'specifiedProperty'?: string;
          } | Record<string, any>;
      'objectPropertyWithNumberAdditionalProperties'?: {
            'specifiedProperty'?: string;
          } | Record<string, number>;
    } | Record<string, any>;
