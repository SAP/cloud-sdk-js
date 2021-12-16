import { Airports } from './Airports';
import { AirportsRequestBuilder } from './AirportsRequestBuilder';
import { AirportLocationField } from './AirportLocation';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v4';
import {
  EdmTypeField,
  AllFields,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
export declare class AirportsApi<T extends DeSerializers = DefaultDeSerializers>
  implements EntityApi<Airports<T>, T>
{
  deSerializers: T;
  constructor(deSerializers?: T);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof Airports;
  requestBuilder(): AirportsRequestBuilder<T>;
  entityBuilder(): EntityBuilderType<Airports<T>, T>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<Airports<T>, T, NullableT>;
  get schema(): {
    /**
     *
     * All fields selector.
     */
    ALL_FIELDS: AllFields<
      Airports<
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
     * Static representation of the [[icaoCode]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ICAO_CODE: EdmTypeField<
      Airports<
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
     * Static representation of the [[name]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    NAME: EdmTypeField<
      Airports<
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
     * Static representation of the [[iataCode]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    IATA_CODE: EdmTypeField<
      Airports<
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
     * Static representation of the [[location]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    LOCATION: AirportLocationField<
      Airports<
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
      false,
      true
    >;
  };
}
//# sourceMappingURL=AirportsApi.d.ts.map
