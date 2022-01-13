import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';
import { BuPaAddressUsage, BuPaAddressUsageType } from './BuPaAddressUsage';
import { AddressEmailAddress, AddressEmailAddressType } from './AddressEmailAddress';
import { AddressFaxNumber, AddressFaxNumberType } from './AddressFaxNumber';
import { AddressPhoneNumber, AddressPhoneNumberType } from './AddressPhoneNumber';
import { AddressHomePageUrl, AddressHomePageUrlType } from './AddressHomePageUrl';
/**
 * This class represents the entity "A_BusinessPartnerAddress" of service "API_BUSINESS_PARTNER".
 */
export declare class BusinessPartnerAddress<T extends DeSerializers = DefaultDeSerializers> extends Entity implements BusinessPartnerAddressType<T> {
    /**
     * Technical entity name for BusinessPartnerAddress.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the BusinessPartnerAddress entity
     */
    static _keys: string[];
    /**
     * Business Partner Number.
     * Key identifying a business partner in the SAP system. The key is unique within a client.
     * Maximum length: 10.
     */
    businessPartner: DeserializedType<T, 'Edm.String'>;
    /**
     * Address Number.
     * Internal key for identifying a Business Address Services address.
     * For more information about the meaning and use of the address number and the Business Address Services concepts, see the function group SZA0 documentation.
     * Maximum length: 10.
     */
    addressId: DeserializedType<T, 'Edm.String'>;
    /**
     * Validity Start of a Business Partner Address.
     * @nullable
     */
    validityStartDate?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
    /**
     * Validity End of a Business Partner Address.
     * @nullable
     */
    validityEndDate?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
    /**
     * Authorization Group.
     * You can use authorization groups to stipulate which business partners a user is allowed to process.
     * Use the following authorization object:'Business partners: authorization groups' (B_BUPA_GRP).The system only checks this authorization if you made an entry in the "Authorization group" field for the business partner. Otherwise, any user may process the business partner.
     * Maximum length: 4.
     * @nullable
     */
    authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * GUID of a Business Partner Address.
     * @nullable
     */
    addressUuid?: DeserializedType<T, 'Edm.Guid'> | null;
    /**
     * Street 3.
     * Additional address field which is printed above the Street line.
     * The Street address contains two lines above the street and two lines below the street.See Print the Street address.
     * Maximum length: 40.
     * @nullable
     */
    additionalStreetPrefixName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Street 5.
     * Additional address field which is printed under the Street line.
     * The Street address has two lines above the street and two lines below the steet.See Print the Street address.
     * Maximum length: 40.
     * @nullable
     */
    additionalStreetSuffixName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Address time zone.
     * Time zone as part of an address.
     * The time zone is automatically determined by the system in address maintenance if time zone Customizing is maintained.It depends on the country and the region. (Region means state, province or county, depending on the country)The automatic determination is only made if there is no value in the time zone field.
     * Maximum length: 6.
     * @nullable
     */
    addressTimeZone?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * c/o name.
     * Part of the address (c/o = care of) if the recipient is different from the occupant and the names are not similar (e.g. subtenants).
     * Put the country-specific code (e.g. c/o) in front of the name of the occupant. This is not automatically done in the print format, like the language-specific word "PO Box".John Smithc/o David BrownThis field is not always automatically printed, as it was subsequently added to the address structure.The print program or form may need to be adjusted.This exception applies to the following fields:Street2, Street3, Street4, Street5, c/o name, and to all address fields added after Release 4.5.
     * Maximum length: 40.
     * @nullable
     */
    careOfName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * City code for city/street file.
     * Maximum length: 12.
     * @nullable
     */
    cityCode?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * City.
     * City name as part of the address.
     * The city name is saved redundantly in another database field in upper- case letters, for search help.If the Postal regional structure ('city file') is active, the city name is checked against the Cities defined in the regional structure.
     * Maximum length: 40.
     * @nullable
     */
    cityName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Company Postal Code (for Large Customers).
     * Postal code that is assigned directly to one company (= company postal code = major customer postal code).
     * This field is used for countries where major companies are assigned their own postal code by the national post office.This postal code has to be entered in the field "Company Postal Code". Postal codes for group major customers, however, have to be entered in the field "PO Box Postal Code", since individual customers with a shared postal code for group major customers are differentiated by means of their PO box.
     * Maximum length: 10.
     * @nullable
     */
    companyPostalCode?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Country/Region Key.
     * The country/region key contains information which the system uses to check entries such as the length of the postal code or bank account number.
     * The two-character ISO code in accordance with ISO 3166, which is delivered by SAP as a default, is usually used.It could also be the vehicle license plate country/region code or a typical country/region key, for example, in Germany the Federal statistics office key.The country/region keys are determined at system installation in the global settings.The definition of the country/region keys in the SAP system does not necessarily have to match political or state units.Since the country/region key does not have to correspond to the ISO code in all installations, programs that differ according to certain values of the country/region key cannot query the country/region key T005-LAND1, but have to program based on the ISO code T005 INTCA.
     * Maximum length: 3.
     * @nullable
     */
    country?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * County.
     * Specifies the county’s name
     * This field is used to store the county’s name. You can enter the name of the county in this field.
     * Maximum length: 40.
     * @nullable
     */
    county?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Number of Delivery Service.
     * The delivery service is part of the PO box address.
     * Some countries offer different services in addition to regular postal delivery and PO boxes, for example the Private Bag or Response Bag. If an address is related to one of these delivery services, the information about this particular delivery service has to be entered in the corresponding fields.In the field "Number of Delivery Service," the number of the Private Bag, Response Bag, or other relevant service has to be entered. Entering a number is not mandatory for each delivery service.For each address, either the information about the PO box or the information about the delivery service can be entered, but not both types of information at the same time.Mr PickeringPrivate Bag 106999Timaru 7942Delivery services will only be taken into account for address formatting in countries in which they are commonly used in addition to regular postal delivery and PO boxes, for example, in Australia, New Zealand, and the USA. In all other countries, these fields will not be taken into account for address formatting.
     * Maximum length: 10.
     * @nullable
     */
    deliveryServiceNumber?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Type of Delivery Service.
     * The delivery service is part of the PO box address.
     * Some countries offer different services in addition to regular postal delivery and PO boxes, for example the Private Bag or Response Bag. If an address is related to one of these delivery services, the information about this particular delivery service has to be entered in the corresponding fields.In the field "Type of Delivery Service," the type of the delivery service has to be entered.For each address, either the information about the PO box or the information about the delivery service can be entered, but not both types of information at the same time.Mr PickeringPrivate Bag 106999Timaru 7942Delivery services will only be taken into account for address formatting in countries in which they are commonly used in addition to regular postal delivery and PO boxes, for example, in Australia, New Zealand, and the USA. In all other countries, these fields will not be taken into account for address formatting.
     * Maximum length: 4.
     * @nullable
     */
    deliveryServiceTypeCode?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * District.
     * City or District supplement
     * In some countries, this entry is appended with a hyphen to the city name by the automatic address formatting, other countries, it is output on a line of its own or (e.g. in the USA) not printed.See the examples in the Address Layout Key documentation.
     * Maximum length: 40.
     * @nullable
     */
    district?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Form-of-Address Key.
     * Key for form of address text.
     * You can also define a form of address text in Customizing.The form of address text can be maintained in different languages.
     * Maximum length: 4.
     * @nullable
     */
    formOfAddress?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Full name of a party (Bus. Partner, Org. Unit, Doc. address).
     * This field contains the full name or formatted name of a party.
     * For organizations or document addresses, typically the fields Name1 and Name2 are concatenated.For persons the field contains the formatted name according to country specific rules. It corresponds e.g. to the content of the fields BUT000-NAME1_TEXT or ADRP-NAME_TEXT.
     * Maximum length: 80.
     * @nullable
     */
    fullName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * City (different from postal city).
     * City of residence which is different from the postal city
     * In some countries, the residential city is required if it differs from the postal city.In the USA, the official street indexes, against which data can be checked, are based on the residential city, not the postal city, which may be different.It is the same in France, where a postally correct address must contain the residential city in a separate line above the postal city, if it differs from the postal city.This field is not always automatically printed, as it was subsequently added to the address structure.The print program or form may need to be adjusted.This exception applies to the following fields:Street2, Street3, Street4, Street5, c/o name, and to all address fields added after Release 4.5.
     * Maximum length: 40.
     * @nullable
     */
    homeCityName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * House Number.
     * House number as part of an address.
     * It is printed in the Street line.Other supplementary street information can be entered in the House number supplement or one of the Street2, Street3, Street4 or Street5 fields. See Print the Street address.A house number (e.g. 117) or a house number with supplement (e.g. 117a), or a house number range (e.g. 16-20), can be maintained in this field.
     * Maximum length: 10.
     * @nullable
     */
    houseNumber?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * House number supplement.
     * House number supplement as part of an address, e.g.
     * App. 17 orSuite 600.It is printed in the Street line.Further Street supplements can be put in one of the fields Street2, Street3, Street4 or Street5.See Print the Street address.
     * Maximum length: 10.
     * @nullable
     */
    houseNumberSupplementText?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Language Key.
     * The language key indicates
     * - the language in which texts are displayed,- the language in which you enter texts,- the language in which the system prints texts.
     * Maximum length: 2.
     * @nullable
     */
    language?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * PO Box.
     * PO Box number as part of an address.
     * Only enter the PO Box number in this field. The text "PO Box" is provided in the recipient language by the system when you print the address.When you print an address, the "Street address" and the "PO Box address" are distinguished. The print program determines which of them has priority if both are maintained in an address record.Besides the PO Box number, the PO Box address uses the following fields:PO Box postal code, if specified (otherwise the normal postal code)PO Box city, if specified (otherwise the normal city)PO Box region, if specified (otherwise the normal region)PO Box country, if specified (otherwise the normal country)If the address is a "PO Box" (without a number), do not fill the "PO Box" field. Select the "PO Box w/o Number" indicator instead.You can also enter a company postal code for organizational addresses, instead of a PO Box. A separate field is predefined for this entry.For general information and examples about address formatting, see the documentation on the Address Structure Key.
     * Maximum length: 10.
     * @nullable
     */
    poBox?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * PO Box city.
     * Different city for the PO Box as an address component.
     * The PO Box city can be entered here if it is different from the address city.If the address is only a PO Box address,  enter the city in the normal city field.If the address contains two different city names for the address and the PO Box address, use this field.
     * Maximum length: 40.
     * @nullable
     */
    poBoxDeviatingCityName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * PO Box of Country/Region.
     * Other country/region for PO box in an address.
     * Here you can enter the country/region for the PO box if this country/region is different to the country/region of the street address.If the address only has a PO box address, you enter the country/region in in the normal field for country/region.If the street address and the PO box belong to two different countries/regions, you fill this field.This field is not always automatically printed, as it was subsequently added to the address structure.The print program or form may need to be adjusted.This exception applies to the following fields:Street2, Street3, Street4, Street5, c/o name, and to all address fields added after Release 4.5.
     * Maximum length: 3.
     * @nullable
     */
    poBoxDeviatingCountry?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Region for PO Box (Country/Region, State, Province, ...).
     * Different Region for PO Box in an address.
     * Enter the PO Box Region here, if it differs from the street address region.If the address only has a PO Box address, the Region in in the normal Region field.Use this field if the address has two different Region values for the street address and the PO Box address.This field is not always automatically printed, as it was subsequently added to the address structure.The print program or form may need to be adjusted.This exception applies to the following fields:Street2, Street3, Street4, Street5, c/o name, and to all address fields added after Release 4.5.
     * Maximum length: 3.
     * @nullable
     */
    poBoxDeviatingRegion?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Flag: PO Box Without Number.
     * PO Box address without PO Box number flag.
     * Only the word 'PO Box' is output in PO Box addresses without PO Box number.Set this flag for a PO Box address without PO Box number.This field is not always automatically printed, as it was subsequently added to the address structure.The print program or form may need to be adjusted.This exception applies to the following fields:Street2, Street3, Street4, Street5, c/o name, and to all address fields added after Release 4.5.
     * @nullable
     */
    poBoxIsWithoutNumber?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * PO Box Lobby.
     * The PO box lobby is part of the PO box address.
     * In some countries, entering a PO box, postal code and city is not sufficient to uniquely identify a PO box, because the same PO box number is assigned multiple times in some cities.Therefore, additional information might be required to determine the post office of the PO box in question. This information can be entered in the field "PO Box Lobby."Mr NellingPO Box 4099HighfieldTimaru 7942The PO box lobby will only be taken into account for address formatting in countries in which it is commonly used in addition to regular postal delivery and PO boxes, for example, in Canada or New Zealand. In all other countries, this field will not be taken into account for address formatting.
     * Maximum length: 40.
     * @nullable
     */
    poBoxLobbyName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * PO Box Postal Code.
     * Postal code that is required for a unique assignment of the PO box.
     * This field is used for countries where a different postal code applies to mail that is sent to the PO box rather than to the street address of a particular business partner.Postal codes for group major customers also have to be entered in the field for the PO box postal code since individual customers with a shared postal code for group major customers are differentiated by means of the PO box. Postal codes for major customers (= company postal codes), however, are assigned to one customer only and have to be entered in the field 'Company Postal Code'.
     * Maximum length: 10.
     * @nullable
     */
    poBoxPostalCode?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Person Number.
     * Internal key for identifying a person in Business Address Services.
     * For more information about the meaning and use of the person number and Business Address Services concepts, see the function group SZA0 documentation.
     * Maximum length: 10.
     * @nullable
     */
    person?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * City Postal Code.
     * Postal code as part of the address
     * If different postal codes are maintained for the PO Box and Street address of an address, this field contains the Street address postal code.
     * Maximum length: 10.
     * @nullable
     */
    postalCode?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Communication Method (Key) (Business Address Services).
     * Communication method with which you can exchange documents and messages with a business partner.
     * In Business Address Services, you can specify a standard communication method that can be used by programs to determine the means of communication for sending messages.One business partner wants all messages by fax, another by e-mail.The application context can restrict the possible methods of communication. For example, invitations should perhaps only be sent by post because of enclosures, whereas minutes can be sent by post, fax or e-mail.Communication strategies can be defined for this purpose and applied in application contexts.
     * Maximum length: 3.
     * @nullable
     */
    prfrdCommMediumType?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Region (State, Province, County).
     * In some countries, the region forms part of the address. The meaning depends on the country.
     * The automatic address formatting function prints the region in addresses in the USA, Canada, Italy, Brazil or Australia, and the county in Great Britain.For more information, see the examples in the documentation on the Address Layout Key.Meaning of the regional code in ...Australia       -&gt;  ProvinceBrazil          -&gt;  StateCanada          -&gt;  ProvinceGermany         -&gt;  StateGreat Britain   -&gt;  CountyItaly           -&gt;  ProvinceJapan           -&gt;  PrefectureSwitzerland     -&gt;  CantonUSA             -&gt;  State.
     * Maximum length: 3.
     * @nullable
     */
    region?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Street.
     * Street name as part of the address.
     * The street name is saved, redundantly in upper case in another database field, for search help purposes.There are other fields for address parts which can be printed above or below the street. See Print the Street address.The house number and other supplements are usually maintained in their own fields. See Formatting the Street line.
     * Maximum length: 60.
     * @nullable
     */
    streetName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Street 2.
     * Additional address field which is printed above the Street line.
     * The Street address contains two lines above the street and two lines below the street.See Print the Street address.This field is not always automatically printed, as it was subsequently added to the address structure.The print program or form may need to be adjusted.This exception applies to the following fields:Street2, Street3, Street4, Street5, c/o name, and to all address fields added after Release 4.5.
     * Maximum length: 40.
     * @nullable
     */
    streetPrefixName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Street 4.
     * Additional address field which is printed below the Street line.
     * The Street address contains two lines above the street and two lines below the street.See Print the Street address.
     * Maximum length: 40.
     * @nullable
     */
    streetSuffixName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Tax Jurisdiction.
     * Specifies the  tax jurisdiction.
     * Maximum length: 15.
     * @nullable
     */
    taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Transportation zone to or from which the goods are delivered.
     * Sales and distribution:
     * Regional zone of Goods recipient.Purchasing:Regional zone of supplier.You can define regional zones to suit the requirements of your own business and country.Sales and distributionthe system automatically proposes a suitable route by using the transportation zone of the goods recipient in combination with other information about the delivery, such as theCountries of origin and destinationShipping conditionsTransportation groupIn the USA, for example, you can define regional zones to correspond to the US postal zip codes.
     * Maximum length: 10.
     * @nullable
     */
    transportZone?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Address number in external system.
     * Address number from an external system or a legacy system
     * If the current address has a different number in an external system, you can save this number here for information purposes.In direct input you are able to maintain an address for a business partner by stating the external address number. If your business partner data is maintained in a legacy system, you can thus transmit changes to a BP address to the SAP system without having to know the SAP address number in the legacy system.
     * Maximum length: 20.
     * @nullable
     */
    addressIdByExternalSystem?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * County code for county.
     * Specifies the county’s code
     * This field stores the county’s code. You cannot enter any data in this field. The system fetches this data from the ADRCOUNTY table and updates it in this field.
     * Maximum length: 8.
     * @nullable
     */
    countyCode?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Township code for Township.
     * Specifies the township’s code
     * This field stores the township’s code. You cannot enter any data in this field. The system fetches this data from the ADRTOWNSHIP table and updates it in this field.
     * Maximum length: 8.
     * @nullable
     */
    townshipCode?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Township.
     * Specifies the township’s name
     * This field is used to store the township’s name. You can enter the name of the township in this field.
     * Maximum length: 40.
     * @nullable
     */
    townshipName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * One-to-many navigation property to the [[BuPaAddressUsage]] entity.
     */
    toAddressUsage: BuPaAddressUsage<T>[];
    /**
     * One-to-many navigation property to the [[AddressEmailAddress]] entity.
     */
    toEmailAddress: AddressEmailAddress<T>[];
    /**
     * One-to-many navigation property to the [[AddressFaxNumber]] entity.
     */
    toFaxNumber: AddressFaxNumber<T>[];
    /**
     * One-to-many navigation property to the [[AddressPhoneNumber]] entity.
     */
    toMobilePhoneNumber: AddressPhoneNumber<T>[];
    /**
     * One-to-many navigation property to the [[AddressPhoneNumber]] entity.
     */
    toPhoneNumber: AddressPhoneNumber<T>[];
    /**
     * One-to-many navigation property to the [[AddressHomePageUrl]] entity.
     */
    toUrlAddress: AddressHomePageUrl<T>[];
}
export interface BusinessPartnerAddressType<T extends DeSerializers = DefaultDeSerializers> {
    businessPartner: DeserializedType<T, 'Edm.String'>;
    addressId: DeserializedType<T, 'Edm.String'>;
    validityStartDate?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
    validityEndDate?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
    authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
    addressUuid?: DeserializedType<T, 'Edm.Guid'> | null;
    additionalStreetPrefixName?: DeserializedType<T, 'Edm.String'> | null;
    additionalStreetSuffixName?: DeserializedType<T, 'Edm.String'> | null;
    addressTimeZone?: DeserializedType<T, 'Edm.String'> | null;
    careOfName?: DeserializedType<T, 'Edm.String'> | null;
    cityCode?: DeserializedType<T, 'Edm.String'> | null;
    cityName?: DeserializedType<T, 'Edm.String'> | null;
    companyPostalCode?: DeserializedType<T, 'Edm.String'> | null;
    country?: DeserializedType<T, 'Edm.String'> | null;
    county?: DeserializedType<T, 'Edm.String'> | null;
    deliveryServiceNumber?: DeserializedType<T, 'Edm.String'> | null;
    deliveryServiceTypeCode?: DeserializedType<T, 'Edm.String'> | null;
    district?: DeserializedType<T, 'Edm.String'> | null;
    formOfAddress?: DeserializedType<T, 'Edm.String'> | null;
    fullName?: DeserializedType<T, 'Edm.String'> | null;
    homeCityName?: DeserializedType<T, 'Edm.String'> | null;
    houseNumber?: DeserializedType<T, 'Edm.String'> | null;
    houseNumberSupplementText?: DeserializedType<T, 'Edm.String'> | null;
    language?: DeserializedType<T, 'Edm.String'> | null;
    poBox?: DeserializedType<T, 'Edm.String'> | null;
    poBoxDeviatingCityName?: DeserializedType<T, 'Edm.String'> | null;
    poBoxDeviatingCountry?: DeserializedType<T, 'Edm.String'> | null;
    poBoxDeviatingRegion?: DeserializedType<T, 'Edm.String'> | null;
    poBoxIsWithoutNumber?: DeserializedType<T, 'Edm.Boolean'> | null;
    poBoxLobbyName?: DeserializedType<T, 'Edm.String'> | null;
    poBoxPostalCode?: DeserializedType<T, 'Edm.String'> | null;
    person?: DeserializedType<T, 'Edm.String'> | null;
    postalCode?: DeserializedType<T, 'Edm.String'> | null;
    prfrdCommMediumType?: DeserializedType<T, 'Edm.String'> | null;
    region?: DeserializedType<T, 'Edm.String'> | null;
    streetName?: DeserializedType<T, 'Edm.String'> | null;
    streetPrefixName?: DeserializedType<T, 'Edm.String'> | null;
    streetSuffixName?: DeserializedType<T, 'Edm.String'> | null;
    taxJurisdiction?: DeserializedType<T, 'Edm.String'> | null;
    transportZone?: DeserializedType<T, 'Edm.String'> | null;
    addressIdByExternalSystem?: DeserializedType<T, 'Edm.String'> | null;
    countyCode?: DeserializedType<T, 'Edm.String'> | null;
    townshipCode?: DeserializedType<T, 'Edm.String'> | null;
    townshipName?: DeserializedType<T, 'Edm.String'> | null;
    toAddressUsage: BuPaAddressUsageType<T>[];
    toEmailAddress: AddressEmailAddressType<T>[];
    toFaxNumber: AddressFaxNumberType<T>[];
    toMobilePhoneNumber: AddressPhoneNumberType<T>[];
    toPhoneNumber: AddressPhoneNumberType<T>[];
    toUrlAddress: AddressHomePageUrlType<T>[];
}
// # sourceMappingURL=BusinessPartnerAddress.d.ts.map
