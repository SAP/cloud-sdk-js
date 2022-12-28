/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v4';
import { Location } from './Location';
import type { PeopleApi } from './PeopleApi';
import { PersonGender } from './PersonGender';
import { Photos, PhotosType } from './Photos';
/**
 * This class represents the entity "People" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export declare class People<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements PeopleType<T>
{
  readonly _entityApi: PeopleApi<T>;
  /**
   * Technical entity name for People.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the People entity
   */
  static _keys: string[];
  /**
   * User Name.
   */
  userName: DeserializedType<T, 'Edm.String'>;
  /**
   * First Name.
   */
  firstName: DeserializedType<T, 'Edm.String'>;
  /**
   * Last Name.
   */
  lastName: DeserializedType<T, 'Edm.String'>;
  /**
   * Emails.
   * @nullable
   */
  emails?: DeserializedType<T, 'Edm.String'>[] | null;
  /**
   * Address Info.
   * @nullable
   */
  addressInfo?: Location<T>[] | null;
  /**
   * Gender.
   * @nullable
   */
  gender?: PersonGender | null;
  /**
   * Concurrency.
   */
  concurrency: DeserializedType<T, 'Edm.Int64'>;
  /**
   * One-to-many navigation property to the {@link People} entity.
   */
  friends: People<T>[];
  /**
   * One-to-one navigation property to the {@link Photos} entity.
   */
  photo?: Photos<T> | null;
  constructor(_entityApi: PeopleApi<T>);
}
export interface PeopleType<T extends DeSerializers = DefaultDeSerializers> {
  userName: DeserializedType<T, 'Edm.String'>;
  firstName: DeserializedType<T, 'Edm.String'>;
  lastName: DeserializedType<T, 'Edm.String'>;
  emails?: DeserializedType<T, 'Edm.String'>[] | null;
  addressInfo?: Location<T>[] | null;
  gender?: PersonGender | null;
  concurrency: DeserializedType<T, 'Edm.Int64'>;
  friends: PeopleType<T>[];
  photo?: PhotosType<T> | null;
}
//# sourceMappingURL=People.d.ts.map
