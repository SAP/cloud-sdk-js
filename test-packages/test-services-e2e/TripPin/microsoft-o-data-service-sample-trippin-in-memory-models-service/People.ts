/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
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
export class People<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements PeopleType<T>
{
  /**
   * Technical entity name for People.
   */
  static override _entityName = 'People';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath =
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
  /**
   * All key fields of the People entity.
   */
  static _keys = ['UserName'];
  /**
   * User Name.
   */
  declare userName: DeserializedType<T, 'Edm.String'>;
  /**
   * First Name.
   */
  declare firstName: DeserializedType<T, 'Edm.String'>;
  /**
   * Last Name.
   */
  declare lastName: DeserializedType<T, 'Edm.String'>;
  /**
   * Emails.
   * @nullable
   */
  declare emails?: DeserializedType<T, 'Edm.String'>[] | null;
  /**
   * Address Info.
   * @nullable
   */
  declare addressInfo?: Location<T>[] | null;
  /**
   * Gender.
   * @nullable
   */
  declare gender?: PersonGender | null;
  /**
   * Concurrency.
   */
  declare concurrency: DeserializedType<T, 'Edm.Int64'>;
  /**
   * One-to-many navigation property to the {@link People} entity.
   */
  declare friends: People<T>[];
  /**
   * One-to-one navigation property to the {@link Photos} entity.
   */
  declare photo?: Photos<T> | null;

  constructor(_entityApi: PeopleApi<T>) {
    super(_entityApi);
  }
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
