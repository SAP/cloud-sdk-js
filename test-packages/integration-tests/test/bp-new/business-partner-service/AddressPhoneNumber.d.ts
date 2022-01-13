import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';
/**
 * This class represents the entity "A_AddressPhoneNumber" of service "API_BUSINESS_PARTNER".
 */
export declare class AddressPhoneNumber<T extends DeSerializers = DefaultDeSerializers> extends Entity implements AddressPhoneNumberType<T> {
    /**
     * Technical entity name for AddressPhoneNumber.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the AddressPhoneNumber entity
     */
    static _keys: string[];
    /**
     * Address Number.
     * Internal key for identifying a Business Address Services address.
     * For more information about the meaning and use of the address number and the Business Address Services concepts, see the function group SZA0 documentation.
     * Maximum length: 10.
     */
    addressId: DeserializedType<T, 'Edm.String'>;
    /**
     * Person Number.
     * Internal key for identifying a person in Business Address Services.
     * For more information about the meaning and use of the person number and Business Address Services concepts, see the function group SZA0 documentation.
     * Maximum length: 10.
     */
    person: DeserializedType<T, 'Edm.String'>;
    /**
     * Sequence Number.
     * Maximum length: 3.
     */
    ordinalNumber: DeserializedType<T, 'Edm.String'>;
    /**
     * Country/Region for Telephone/Fax Number.
     * The country/region for the telephone number or fax number is maintained here.
     * This specification is used to determine the correct country/region code. A normalized form of the telephone number or fax number is then derived and stored in a field for a program-driven search.In most cases, the telephone number or fax number refers directly to an address.If this is the case, when a new number is created, the country/region of the address is proposed.If this is not the case (for example, with address-independent communication data for a business partner), the country/region from the user parameter LND is proposed (if it is maintained).If the user parameter LND is not maintained, the country/region of the company address assigned in the user master data is proposed.If the country/region of the address changes, the country/region of the corresponding telephone number and fax address is not changed automatically.Example: A business partner moves abroad.If the telephone number is for a permanent connection, the telephone number also changes when the business partner moves and has to be maintained again in the system.If the telephone number is for a mobile telephone and the number is retained, the original country/region for this telephone number also has to be retained and must not be changed automatically to the new country/region of the address.
     * Maximum length: 3.
     * @nullable
     */
    destinationLocationCountry?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Standard Sender Address in this Communication Type.
     * If several addresses are maintained for one communication type, the user in the SAP System can be reached under one of these addresses. One address can be set as theStandard Address.
     * The standard address is used for the following functions:When sending using the  SMTP nodein SAPconnect, the home address of the communication type used is the one set as the sender address. The recipient can see this address in the sender information and can also reply directly to this address. The standard address is also transferred and can be used for incoming status notifications, for example.When sending using an RFC node in SAPconnect, the standard address of the communication type used is the one set as the sender address. The structure defined in the case of the RFC does not permit another address to be transferred, so the standard address is used for incoming status notifications too.The SAP users have the addresses of their exchange P.O. boxes in their standard communication type 'Internet Mail' as the home address and their Internet address in the SAP system as their standard address. Example:Home address: Bernard.Brown@Company.comStandard address: Bernard.Brown@System.Company.comSending using an SMTP nodeThe home address of the communication type 'Internet Mail' (Bernard.Brown@Company.com) is used as the sender address. If a reply is sent to this address the user receives directly in the exchange postbox.Sending using the RFC nodeThe standard address of the communication type 'Internet Mail' (Bernard.Brown@System.Company.com) is used as the sender address. If a reply is sent to this address, it arrives back to the SAP system.Example using a mail system groupThe users should get all messages in their Microsoft Exchange postboxes. In the SAP system the mail system group is activated for this using the setting "Send Messages to the Home Address".The address settings of the SAP users remain unchanged:Home address: Bernard.Brown@Company.comStandard address: Bernard.Brown@System.Company.comSending using an SMTP nodeThe home address of the communication type 'Internet Mail' (Bernard.Brown@Company.com) is used as the sender address. If a reply is sent to this address the user receives directly in the exchange postbox.Sending using the RFC nodeThe standard address of the communication type 'Internet Mail' (Bernard.Brown@System.Company.com) is used as the sender address. If a reply is sent to this address it arrives back in the SAP system. It is then forwarded using the mail system group to the home address and the user gets it in the exchange postbox.
     * @nullable
     */
    isDefaultPhoneNumber?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Telephone No.: Dialing Code + Number.
     * Telephone number, consisting of dialling code and number, but without country dialling code.
     * If the telephone number consists of a company number and an extension, the extension must be entered in the field extension.Telephone number, as it is dialled from within the country.For the number "01234/567-0" enter the following:Telephone: 01234/567Estension: 0For the number "01234/567-891" enter the following:Telephone: 01234/567Extension: 891For the number "012-345-678" (678 as extension) enter the following:Telepone: 012-345Extension: 678In the following cases enter the complete number (without country dialling code) in the field Telephone:No part of the number can be regarded as an extension.You are not sure which part of the number can be regarded as an extension.
     * Maximum length: 30.
     * @nullable
     */
    phoneNumber?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Telephone no.: Extension.
     * Telephone extension number
     * If the telephone number consists of a company number and an extension, the extension should be entered here.Enter the extension.The following rules apply for the format of telephone and fax numbers:The length of the entries in the field Telephone and Extension (Fax and Extension) cannot be more than 24 characters in total.Leading spaces are not allowed in the field Telephone or Fax or in the field Extension.Valid characters are:Numbers (0123456789)Letters (ABCDEFGHIJKLMNOPQRSTUVWXYZ)Following other characters:  /, (, ), - *, # and " " (space), but not as a leading space.If an + is entered as the first character, the system checks whether the specified number starts with a country code. If so, a warning message is displayed because the country code is automatically determined by the system and should not be stored in the Telephone number (Fax number) field.If an &amp; is entered as the first character, the automatic check and formatting of the telephone number (fax number), as well as the determination of the country code, is suppressed.For the number "01234/567-0" enter the following:Telephone: 01234/567Estension: 0For the number "01234/567-891" enter the following:Telephone: 01234/567Extension: 891For the number "012-345-678" (678 as extension) enter the following:Telepone: 012-345Extension: 678In the following cases enter the complete number (without country dialling code) in the field Telephone:No part of the number can be regarded as an extension.You are not sure which part of the number can be regarded as an extension.
     * Maximum length: 10.
     * @nullable
     */
    phoneNumberExtension?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Complete Number: Dialing Code+Number+Extension.
     * The content of this field is automatically calculated by the system based on the telephone number and country code components.
     * This field is therefore not to be filled when Business Address Services function modules are called.
     * Maximum length: 30.
     * @nullable
     */
    internationalPhoneNumber?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Indicator: Telephone is a Mobile Telephone.
     * This field specifies whether the telephone number is a mobile telephone number.
     * ' ' :   The telephone number is a fixed-line telephone'1' :   The telephone number is the standard fixed-line telephone'2' :   The telephone nubmer is a mobile telephone'3' :   The telephone number is the standard mobile telephoneEither the standard fixed-line telephone number or the standard mobile telephone number is also the standard telephone number (FLGDEFAULT = 'X').In older data sets, this field may have also have the value ' ' for the standard fixed-line telephone. In this case, however, FLGDEFAULT is always 'X'.In Customizing, you can specify whether the SMS-compatible indicator is to be proposed for new mobile telephone numbers created in dialog by choosing General Settings -&gt; Set countries  -&gt; Define Mobile Telephone Attributes for each country.
     * Maximum length: 1.
     * @nullable
     */
    phoneNumberType?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Communication link notes.
     * Additional information about the communication connection
     * You can maintain further information about the communication connection here. In the case of telephone numbers, for example, you can maintain the times at which the call recipient is available and those at which they are not, or you can specify whether the number is that of the secretary.The information is stored in table ADRT, regardless of language.
     * Maximum length: 50.
     * @nullable
     */
    addressCommunicationRemarkText?: DeserializedType<T, 'Edm.String'> | null;
}
export interface AddressPhoneNumberType<T extends DeSerializers = DefaultDeSerializers> {
    addressId: DeserializedType<T, 'Edm.String'>;
    person: DeserializedType<T, 'Edm.String'>;
    ordinalNumber: DeserializedType<T, 'Edm.String'>;
    destinationLocationCountry?: DeserializedType<T, 'Edm.String'> | null;
    isDefaultPhoneNumber?: DeserializedType<T, 'Edm.Boolean'> | null;
    phoneNumber?: DeserializedType<T, 'Edm.String'> | null;
    phoneNumberExtension?: DeserializedType<T, 'Edm.String'> | null;
    internationalPhoneNumber?: DeserializedType<T, 'Edm.String'> | null;
    phoneNumberType?: DeserializedType<T, 'Edm.String'> | null;
    addressCommunicationRemarkText?: DeserializedType<T, 'Edm.String'> | null;
}
// # sourceMappingURL=AddressPhoneNumber.d.ts.map
