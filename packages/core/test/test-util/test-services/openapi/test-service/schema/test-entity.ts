/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { SimpleTestEntity } from './simple-test-entity';
    /**
     * TestEntity schema
     */
    export type TestEntity = {
      /**
       * @example "d290f1ee-6c54-4b01-90e6-d701748f0851"
       * Format: "uuid".
       */
      'keyProperty': string;
      /**
       * @example "Example string"
       */
      'stringProperty'?: string;
      /**
       * @example "2016-08-29"
       * Format: "date".
       */
      'dateProperty'?: string;
      /**
       * @example "2016-08-29T09:12:33.001Z"
       * Format: "date-time".
       */
      'dateTimeProperty'?: string;
      /**
       * @example 1
       * Format: "int32".
       */
      'int32Property'?: number;
      /**
       * @example 1
       * Format: "int64".
       */
      'int64Property'?: number;
      /**
       * @example 1
       * Format: "float".
       */
      'floatProperty'?: number;
      /**
       * @example 1
       * Format: "double".
       */
      'doubleProperty'?: number;
      'linkedSimpleTestEntity'?: SimpleTestEntity;
      'linkedSimpleTestEntityCollection'?: SimpleTestEntity[];
    } | Record<string, any>;
