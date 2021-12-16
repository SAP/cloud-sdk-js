/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityLink } from './TestEntityLink';
import { TestEntityLinkRequestBuilder } from './TestEntityLinkRequestBuilder';
import {
  CustomField,
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  mergeDefaultDeSerializersWith
} from '@sap-cloud-sdk/odata-v4';
import {
  OrderableEdmTypeField,
  EdmTypeField,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  Time
} from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
export class TestEntityLinkApi<T extends DeSerializers = DefaultDeSerializers>
  implements EntityApi<TestEntityLink<T>, T>
{
  public deSerializers: T;

  constructor(deSerializers: T = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {};

  _addNavigationProperties(linkedApis: []): this {
    this.navigationPropertyFields = {};
    return this;
  }

  entityConstructor = TestEntityLink;

  requestBuilder(): TestEntityLinkRequestBuilder<T> {
    return new TestEntityLinkRequestBuilder(this);
  }

  entityBuilder(): EntityBuilderType<TestEntityLink<T>, T> {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<TestEntityLink<T>, T, NullableT> {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  get schema() {
    const fieldBuilder = new FieldBuilder(TestEntityLink, this.deSerializers);
    return {
      /**
       * Static representation of the [[keyTestEntityLink]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      KEY_TEST_ENTITY_LINK: fieldBuilder.buildEdmTypeField(
        'KeyTestEntityLink',
        'Edm.Int32',
        false
      ),
      /**
       * Static representation of the [[keyToTestEntity]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      KEY_TO_TEST_ENTITY: fieldBuilder.buildEdmTypeField(
        'KeyToTestEntity',
        'Edm.Int32',
        false
      ),
      /**
       * Static representation of the [[stringProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      STRING_PROPERTY: fieldBuilder.buildEdmTypeField(
        'StringProperty',
        'Edm.String',
        true
      ),
      ...this.navigationPropertyFields,
      /**
       *
       * All fields selector.
       */
      ALL_FIELDS: new AllFields('*', TestEntityLink)
    };
  }
}
