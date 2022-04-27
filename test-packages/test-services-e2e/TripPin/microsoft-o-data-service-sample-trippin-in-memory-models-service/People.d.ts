import { PeopleRequestBuilder } from './PeopleRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { Location } from './Location';
import { PersonGender } from './PersonGender';
import {
  AllFields,
  CollectionField,
  CustomFieldV4,
  EdmTypeField,
  EntityBuilderType,
  EntityV4,
  EnumField,
  Field,
  OneToManyLink,
  OneToOneLink,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "People" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export declare class People extends EntityV4 implements PeopleType {
  /**
   * Technical entity name for People.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * User Name.
   */
  userName: string;
  /**
   * First Name.
   */
  firstName: string;
  /**
   * Last Name.
   */
  lastName: string;
  /**
   * Emails.
   * @nullable
   */
  emails?: string[];
  /**
   * Address Info.
   * @nullable
   */
  addressInfo?: Location[];
  /**
   * Gender.
   * @nullable
   */
  gender?: PersonGender;
  /**
   * Concurrency.
   */
  concurrency: BigNumber;
  /**
   * One-to-many navigation property to the [[People]] entity.
   */
  friends: People[];
  /**
   * One-to-one navigation property to the [[Photos]] entity.
   */
  photo?: Photos | null;
  /**
   * Returns an entity builder to construct instances of `People`.
   * @returns A builder that constructs instances of entity type `People`.
   */
  static builder(): EntityBuilderType<People, PeopleType>;
  /**
   * Returns a request builder to construct requests for operations on the `People` entity type.
   * @returns A `People` request builder.
   */
  static requestBuilder(): PeopleRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `People`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `People`.
   */
  static customField(fieldName: string): CustomFieldV4<People>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
import { Photos, PhotosType } from './Photos';
export interface PeopleType {
  userName: string;
  firstName: string;
  lastName: string;
  emails?: string[] | null;
  addressInfo?: Location[] | null;
  gender?: PersonGender | null;
  concurrency: BigNumber;
  friends: PeopleType[];
  photo?: PhotosType | null;
}
export declare namespace People {
  /**
   * Static representation of the [[userName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const USER_NAME: EdmTypeField<People, 'Edm.String', false, true>;
  /**
   * Static representation of the [[firstName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const FIRST_NAME: EdmTypeField<People, 'Edm.String', false, true>;
  /**
   * Static representation of the [[lastName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const LAST_NAME: EdmTypeField<People, 'Edm.String', false, true>;
  /**
   * Static representation of the [[emails]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const EMAILS: CollectionField<People, 'Edm.String', true, true>;
  /**
   * Static representation of the [[addressInfo]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const ADDRESS_INFO: CollectionField<People, Location, true, true>;
  /**
   * Static representation of the [[gender]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const GENDER: EnumField<People, PersonGender, true, true>;
  /**
   * Static representation of the [[concurrency]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const CONCURRENCY: OrderableEdmTypeField<People, 'Edm.Int64', false, true>;
  /**
   * Static representation of the one-to-many navigation property [[friends]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const FRIENDS: OneToManyLink<People, People>;
  /**
   * Static representation of the one-to-one navigation property [[photo]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const PHOTO: OneToOneLink<People, Photos>;
  /**
   * All fields of the People entity.
   */
  const _allFields: Array<
    | EdmTypeField<People, 'Edm.String', false, true>
    | CollectionField<People, 'Edm.String', true, true>
    | CollectionField<People, Location, true, true>
    | EnumField<People, PersonGender, true, true>
    | OrderableEdmTypeField<People, 'Edm.Int64', false, true>
    | OneToManyLink<People, People>
    | OneToOneLink<People, Photos>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<People>;
  /**
   * All key fields of the People entity.
   */
  const _keyFields: Array<Field<People, boolean, boolean>>;
  /**
   * Mapping of all key field names to the respective static field property People.
   */
  const _keys: {
    [keys: string]: Field<People, boolean, boolean>;
  };
}
//# sourceMappingURL=People.d.ts.map
