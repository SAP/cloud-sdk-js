/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityMultiLink } from './TestEntityMultiLink';
import { TestEntityMultiLinkRequestBuilder } from './TestEntityMultiLinkRequestBuilder';
import { TestEntityLvl2MultiLink } from './TestEntityLvl2MultiLink';
import { TestEntityLvl2MultiLinkApi } from './TestEntityLvl2MultiLinkApi';
import { TestEntityLvl2SingleLink } from './TestEntityLvl2SingleLink';
import { TestEntityLvl2SingleLinkApi } from './TestEntityLvl2SingleLinkApi';
import {
  CustomField,
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  mergeDefaultDeSerializersWith
} from '@sap-cloud-sdk/odata-v2';
import {
  EdmTypeField,
  OrderableEdmTypeField,
  Link,
  OneToOneLink,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  Time
} from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment } from 'moment';
export class TestEntityMultiLinkApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityMultiLink<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  constructor(deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_MULTI_LINK: Link<
      TestEntityMultiLink<DeSerializersT>,
      DeSerializersT,
      TestEntityLvl2MultiLink<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SINGLE_LINK: OneToOneLink<
      TestEntityMultiLink<DeSerializersT>,
      DeSerializersT,
      TestEntityLvl2SingleLink<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [
      TestEntityLvl2MultiLinkApi<DeSerializersT>,
      TestEntityLvl2SingleLinkApi<DeSerializersT>
    ]
  ): this {
    this.navigationPropertyFields = {
      TO_MULTI_LINK: new Link('to_MultiLink', this, linkedApis[0]),
      TO_SINGLE_LINK: new OneToOneLink('to_SingleLink', this, linkedApis[1])
    };
    return this;
  }

  entityConstructor = TestEntityMultiLink;

  requestBuilder(): TestEntityMultiLinkRequestBuilder<DeSerializersT> {
    return new TestEntityMultiLinkRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    TestEntityMultiLink<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    TestEntityMultiLink<DeSerializersT>,
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
      TestEntityMultiLink,
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
      /**
       * Static representation of the [[stringProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      STRING_PROPERTY: fieldBuilder.buildEdmTypeField(
        'StringProperty',
        'Edm.String',
        true
      ),
      /**
       * Static representation of the [[booleanProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      BOOLEAN_PROPERTY: fieldBuilder.buildEdmTypeField(
        'BooleanProperty',
        'Edm.Boolean',
        true
      ),
      /**
       * Static representation of the [[guidProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      GUID_PROPERTY: fieldBuilder.buildEdmTypeField(
        'GuidProperty',
        'Edm.Guid',
        true
      ),
      /**
       * Static representation of the [[int16Property]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      INT_16_PROPERTY: fieldBuilder.buildEdmTypeField(
        'Int16Property',
        'Edm.Int16',
        true
      ),
      ...this.navigationPropertyFields,
      /**
       *
       * All fields selector.
       */
      ALL_FIELDS: new AllFields('*', TestEntityMultiLink)
    };
  }
}
