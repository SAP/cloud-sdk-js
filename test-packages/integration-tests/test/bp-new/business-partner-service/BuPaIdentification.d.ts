import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';
/**
 * This class represents the entity "A_BuPaIdentification" of service "API_BUSINESS_PARTNER".
 */
export declare class BuPaIdentification<T extends DeSerializers = DefaultDeSerializers> extends Entity implements BuPaIdentificationType<T> {
    /**
     * Technical entity name for BuPaIdentification.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the BuPaIdentification entity
     */
    static _keys: string[];
    /**
     * Business Partner Number.
     * Key identifying a business partner in the SAP system. The key is unique within a client.
     * Maximum length: 10.
     */
    businessPartner: DeserializedType<T, 'Edm.String'>;
    /**
     * Identification Type.
     * A document (such as an ID card or driver's license) or an entry in a system of records (such as a commercial register) whose key can be stored as an attribute for a business partner.
     * The identification type is for classifying identification numbers.You can define the identification types and their descriptions in Customizing.You can also specify for which business partner category an ID type should be valid.If necessary, assign the identification type to an Identification Category.You can only assign one identification type to an identification category.
     * Maximum length: 6.
     */
    bpIdentificationType: DeserializedType<T, 'Edm.String'>;
    /**
     * Identification Number.
     * Number that serves to identify a business partner, such as driver's license, or ID card number.
     * Maximum length: 60.
     */
    bpIdentificationNumber: DeserializedType<T, 'Edm.String'>;
    /**
     * Responsible Institution for ID Number.
     * Institution that adminsters or assigns an ID number.
     * Maximum length: 40.
     * @nullable
     */
    bpIdnNmbrIssuingInstitute?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Date of Entry for ID Number.
     * Date on which the ID number was registered or assigned by the appropriate authority.
     * @nullable
     */
    bpIdentificationEntryDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    /**
     * Country/Region in Which ID Number is Valid or Was Assigned.
     * Country/region in which an ID number was assigned, or in which the number is valid.
     * Maximum length: 3.
     * @nullable
     */
    country?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Region (State, Province, County).
     * In some countries, the region forms part of the address. The meaning depends on the country.
     * The automatic address formatting function prints the region in addresses in the USA, Canada, Italy, Brazil or Australia, and the county in Great Britain.For more information, see the examples in the documentation on the Address Layout Key.Meaning of the regional code in ...Australia       -&gt;  ProvinceBrazil          -&gt;  StateCanada          -&gt;  ProvinceGermany         -&gt;  StateGreat Britain   -&gt;  CountyItaly           -&gt;  ProvinceJapan           -&gt;  PrefectureSwitzerland     -&gt;  CantonUSA             -&gt;  State.
     * Maximum length: 3.
     * @nullable
     */
    region?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Validity Start for ID Number.
     * This date marks the start of validity of an ID number.
     * @nullable
     */
    validityStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    /**
     * Validity End for ID Number.
     * This date marks the end of validity of an ID number.
     * @nullable
     */
    validityEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    /**
     * Authorization Group.
     * You can use authorization groups to stipulate which business partners a user is allowed to process.
     * Use the following authorization object:'Business partners: authorization groups' (B_BUPA_GRP).The system only checks this authorization if you made an entry in the "Authorization group" field for the business partner. Otherwise, any user may process the business partner.
     * Maximum length: 4.
     * @nullable
     */
    authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
}
export interface BuPaIdentificationType<T extends DeSerializers = DefaultDeSerializers> {
    businessPartner: DeserializedType<T, 'Edm.String'>;
    bpIdentificationType: DeserializedType<T, 'Edm.String'>;
    bpIdentificationNumber: DeserializedType<T, 'Edm.String'>;
    bpIdnNmbrIssuingInstitute?: DeserializedType<T, 'Edm.String'> | null;
    bpIdentificationEntryDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    country?: DeserializedType<T, 'Edm.String'> | null;
    region?: DeserializedType<T, 'Edm.String'> | null;
    validityStartDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    validityEndDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
}
// # sourceMappingURL=BuPaIdentification.d.ts.map
