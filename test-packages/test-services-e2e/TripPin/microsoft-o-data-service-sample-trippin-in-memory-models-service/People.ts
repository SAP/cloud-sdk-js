/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v4';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
import { Location } from './Location';
import { PersonGender } from './PersonGender';
import { Photos, PhotosType } from './Photos';

/**
 * This class represents the entity "People" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export class People<T extends DeSerializers = DefaultDeSerializers> extends Entity implements PeopleType<T> {
  /**
   * Technical entity name for People.
   */
  static _entityName = 'People';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = 'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
  /**
   * All key fields of the People entity
   */
  static _keys = ['UserName'];
  /**
   * User Name.
   */
  userName!: DeserializedType<T, 'Edm.String'>;
  /**
   * First Name.
   */
  firstName!: DeserializedType<T, 'Edm.String'>;
  /**
   * Last Name.
   */
  lastName!: DeserializedType<T, 'Edm.String'>;
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
  concurrency!: DeserializedType<T, 'Edm.Int64'>;
  /**
   * One-to-many navigation property to the [[People]] entity.
   */
  friends!: People<T>[];
  /**
   * One-to-one navigation property to the [[Photos]] entity.
   */
  photo?: Photos<T> | null;
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
