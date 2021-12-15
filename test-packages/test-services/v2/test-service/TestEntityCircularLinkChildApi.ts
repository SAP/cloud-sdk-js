/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityCircularLinkChild } from './TestEntityCircularLinkChild';
import { TestEntityCircularLinkChildRequestBuilder } from './TestEntityCircularLinkChildRequestBuilder';
import {
  CustomField,
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  mergeDefaultDeSerializersWith
} from '@sap-cloud-sdk/odata-v2';
import {
  EdmTypeField,
  Link,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  Time
} from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
export class TestEntityCircularLinkChildApi<
  T extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityCircularLinkChild<T>, T>
{
  public deSerializers: T;

  constructor(deSerializers: T = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-many navigation property [[toParent]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_PARENT: Link<
      TestEntityCircularLinkChild<T>,
      T,
      TestEntityCircularLinkChild<T>
    >;
  };

  _addNavigationProperties(
    linkedApis: [TestEntityCircularLinkChildApi<T>]
  ): this {
    this.navigationPropertyFields = {
      TO_PARENT: new Link('to_Parent', this, linkedApis[0])
    };
    return this;
  }

  entityConstructor = TestEntityCircularLinkChild;

  requestBuilder(): TestEntityCircularLinkChildRequestBuilder<T> {
    return new TestEntityCircularLinkChildRequestBuilder(this);
  }

  entityBuilder(): EntityBuilderType<TestEntityCircularLinkChild<T>, T> {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<TestEntityCircularLinkChild<T>, T, NullableT> {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  get schema() {
    const fieldBuilder = new FieldBuilder(
      TestEntityCircularLinkChild,
      this.deSerializers
    );
    return {
      /**
       * Static representation of the [[keyProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      KEY_PROPERTY: fieldBuilder.buildEdmTypeField(
        'KeyProperty',
        'Edm.String',
        false
      ),
      ...this.navigationPropertyFields,
      /**
       *
       * All fields selector.
       */
      ALL_FIELDS: new AllFields('*', TestEntityCircularLinkChild)
    };
  }
}
