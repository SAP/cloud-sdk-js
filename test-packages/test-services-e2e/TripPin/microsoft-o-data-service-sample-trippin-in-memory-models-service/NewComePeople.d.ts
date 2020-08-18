import { NewComePeopleRequestBuilder } from './NewComePeopleRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { Location, LocationField } from './Location';
import { PersonGender } from './PersonGender';
import { Feature } from './Feature';
import { AllFields, BigNumberField, CollectionField, CustomField, Entity, EntityBuilderType, EnumField, Field, StringField } from '@sap-cloud-sdk/core/v4';
/**
 * This class represents the entity "NewComePeople" of service "Microsoft.OData.Service.Sample.TrippinInMemory.Models".
 */
export declare class NewComePeople extends Entity implements NewComePeopleType {
    /**
     * Technical entity name for NewComePeople.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for NewComePeople.
     */
    static _serviceName: string;
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
     * @nullable
     */
    lastName?: string;
    /**
     * Middle Name.
     * @nullable
     */
    middleName?: string;
    /**
     * Gender.
     */
    gender: PersonGender;
    /**
     * Age.
     * @nullable
     */
    age?: BigNumber;
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
     * Home Address.
     * @nullable
     */
    homeAddress?: Location;
    /**
     * Favorite Feature.
     */
    favoriteFeature: Feature;
    /**
     * Features.
     */
    features: Feature[];
    /**
     * Returns an entity builder to construct instances `NewComePeople`.
     * @returns A builder that constructs instances of entity type `NewComePeople`.
     */
    static builder(): EntityBuilderType<NewComePeople, NewComePeopleTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `NewComePeople` entity type.
     * @returns A `NewComePeople` request builder.
     */
    static requestBuilder(): NewComePeopleRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `NewComePeople`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `NewComePeople`.
     */
    static customField(fieldName: string): CustomField<NewComePeople>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface NewComePeopleType {
    userName: string;
    firstName: string;
    lastName?: string;
    middleName?: string;
    gender: PersonGender;
    age?: BigNumber;
    emails?: string[];
    addressInfo?: Location[];
    homeAddress?: Location;
    favoriteFeature: Feature;
    features: Feature[];
}
export interface NewComePeopleTypeForceMandatory {
    userName: string;
    firstName: string;
    lastName: string;
    middleName: string;
    gender: PersonGender;
    age: BigNumber;
    emails: string[];
    addressInfo: Location[];
    homeAddress: Location;
    favoriteFeature: Feature;
    features: Feature[];
}
export declare namespace NewComePeople {
    /**
     * Static representation of the [[userName]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const USER_NAME: StringField<NewComePeople>;
    /**
     * Static representation of the [[firstName]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const FIRST_NAME: StringField<NewComePeople>;
    /**
     * Static representation of the [[lastName]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const LAST_NAME: StringField<NewComePeople>;
    /**
     * Static representation of the [[middleName]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const MIDDLE_NAME: StringField<NewComePeople>;
    /**
     * Static representation of the [[gender]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GENDER: EnumField<NewComePeople>;
    /**
     * Static representation of the [[age]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const AGE: BigNumberField<NewComePeople>;
    /**
     * Static representation of the [[emails]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const EMAILS: CollectionField<NewComePeople, 'Edm.String'>;
    /**
     * Static representation of the [[addressInfo]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ADDRESS_INFO: CollectionField<NewComePeople, Location>;
    /**
     * Static representation of the [[homeAddress]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const HOME_ADDRESS: LocationField<NewComePeople>;
    /**
     * Static representation of the [[favoriteFeature]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const FAVORITE_FEATURE: EnumField<NewComePeople>;
    /**
     * Static representation of the [[features]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const FEATURES: CollectionField<NewComePeople, 'Edm.Enum'>;
    /**
     * All fields of the NewComePeople entity.
     */
    const _allFields: Array<StringField<NewComePeople> | EnumField<NewComePeople> | BigNumberField<NewComePeople> | CollectionField<NewComePeople, 'Edm.String'> | CollectionField<NewComePeople, Location> | LocationField<NewComePeople> | CollectionField<NewComePeople, 'Edm.Enum'>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<NewComePeople>;
    /**
     * All key fields of the NewComePeople entity.
     */
    const _keyFields: Array<Field<NewComePeople>>;
    /**
     * Mapping of all key field names to the respective static field property NewComePeople.
     */
    const _keys: {
        [keys: string]: Field<NewComePeople>;
    };
}
//# sourceMappingURL=NewComePeople.d.ts.map