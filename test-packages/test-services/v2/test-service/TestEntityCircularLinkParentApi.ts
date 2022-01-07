/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityCircularLinkParent } from './TestEntityCircularLinkParent';
import { TestEntityCircularLinkParentRequestBuilder } from './TestEntityCircularLinkParentRequestBuilder';
import { TestEntityCircularLinkChild } from './TestEntityCircularLinkChild';
import { TestEntityCircularLinkChildApi } from './TestEntityCircularLinkChildApi';
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
import { Moment } from 'moment';
export class TestEntityCircularLinkParentApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<TestEntityCircularLinkParent<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  constructor(deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-many navigation property [[toChild]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_CHILD: Link<
      TestEntityCircularLinkParent<DeSerializersT>,
      DeSerializersT,
      TestEntityCircularLinkChild<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [TestEntityCircularLinkChildApi<DeSerializersT>]
  ): this {
    this.navigationPropertyFields = {
      TO_CHILD: new Link('to_Child', this, linkedApis[0])
    };
    return this;
  }

  entityConstructor = TestEntityCircularLinkParent;

  requestBuilder(): TestEntityCircularLinkParentRequestBuilder<DeSerializersT> {
    return new TestEntityCircularLinkParentRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    TestEntityCircularLinkParent<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    TestEntityCircularLinkParent<DeSerializersT>,
    DeSerializersT,
    NullableT
  > {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  get schema() {
    const fieldBuilder = new FieldBuilder(
      TestEntityCircularLinkParent,
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
      ALL_FIELDS: new AllFields('*', TestEntityCircularLinkParent)
    };
  }
}
