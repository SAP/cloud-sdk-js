import { People } from './People';
import { PeopleRequestBuilder } from './PeopleRequestBuilder';
import { Photos } from './Photos';
import { PhotosApi } from './PhotosApi';
import { Location } from './Location';
import { PersonGender } from './PersonGender';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v4';
import {
  EdmTypeField,
  CollectionField,
  EnumField,
  OrderableEdmTypeField,
  OneToManyLink,
  OneToOneLink,
  AllFields,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
export declare class PeopleApi<T extends DeSerializers = DefaultDeSerializers>
  implements EntityApi<People<T>, T>
{
  deSerializers: T;
  constructor(deSerializers?: T);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: [PeopleApi<T>, PhotosApi<T>]): this;
  entityConstructor: typeof People;
  requestBuilder(): PeopleRequestBuilder<T>;
  entityBuilder(): EntityBuilderType<People<T>, T>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<People<T>, T, NullableT>;
  get schema(): {
    /**
     *
     * All fields selector.
     */
    ALL_FIELDS: AllFields<
      People<
        DeSerializers<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        >
      >
    >;
    /**
     * Static representation of the one-to-many navigation property [[friends]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FRIENDS: OneToManyLink<People<T>, T, People<T>>;
    /**
     * Static representation of the one-to-one navigation property [[photo]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PHOTO: OneToOneLink<People<T>, T, Photos<T>>;
    /**
     * Static representation of the [[userName]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    USER_NAME: EdmTypeField<
      People<
        DeSerializers<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        >
      >,
      T,
      'Edm.String',
      false,
      true
    >;
    /**
     * Static representation of the [[firstName]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FIRST_NAME: EdmTypeField<
      People<
        DeSerializers<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        >
      >,
      T,
      'Edm.String',
      false,
      true
    >;
    /**
     * Static representation of the [[lastName]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    LAST_NAME: EdmTypeField<
      People<
        DeSerializers<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        >
      >,
      T,
      'Edm.String',
      false,
      true
    >;
    /**
     * Static representation of the [[emails]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    EMAILS: CollectionField<
      People<
        DeSerializers<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        >
      >,
      T,
      'Edm.String',
      true,
      true
    >;
    /**
     * Static representation of the [[addressInfo]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ADDRESS_INFO: CollectionField<
      People<
        DeSerializers<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        >
      >,
      T,
      Location<DefaultDeSerializers>,
      true,
      true
    >;
    /**
     * Static representation of the [[gender]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    GENDER: EnumField<
      People<
        DeSerializers<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        >
      >,
      T,
      PersonGender,
      true,
      true
    >;
    /**
     * Static representation of the [[concurrency]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CONCURRENCY: OrderableEdmTypeField<
      People<
        DeSerializers<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        >
      >,
      T,
      'Edm.Int64',
      false,
      true
    >;
  };
}
//# sourceMappingURL=PeopleApi.d.ts.map
