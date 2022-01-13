import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';
import { SupplierCompany, SupplierCompanyType } from './SupplierCompany';
import { SupplierPurchasingOrg, SupplierPurchasingOrgType } from './SupplierPurchasingOrg';
import { SupplierText, SupplierTextType } from './SupplierText';
/**
 * This class represents the entity "A_Supplier" of service "API_BUSINESS_PARTNER".
 */
export declare class Supplier<T extends DeSerializers = DefaultDeSerializers> extends Entity implements SupplierType<T> {
    /**
     * Technical entity name for Supplier.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the Supplier entity
     */
    static _keys: string[];
    /**
     * Account Number of Supplier.
     * Specifies an alphanumeric key that uniquely identifies the supplier in the SAP system.
     * Maximum length: 10.
     */
    supplier: DeserializedType<T, 'Edm.String'>;
    /**
     * Account Number of the Alternative Payee.
     * The account number of the vendor with whom automatic payment transactions are carried out.
     * The field is only needed if payments are not to be made directly to the vendor to whom the payable is owed. The same applies to bank collections of receivables.The specification in this field applies to all company codes. There is a further field in which every company code can enter an alternative payee separately. If both fields are filled, the company code specification has priority.
     * Maximum length: 10.
     * @nullable
     */
    alternativePayeeAccountNumber?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Authorization Group.
     * The authorization group allows extended authorization protection for particular objects. The authorization groups are freely definable. The authorization groups usually occur in authorization objects together with an activity.
     * Maximum length: 4.
     * @nullable
     */
    authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Name of Person who Created the Object.
     * Name with which the user who entered the master record was logged on in the R/3 System.
     * Maximum length: 12.
     * @nullable
     */
    createdByUser?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Record Created On.
     * Date on which the master record, or the part of the master record being viewed, was created.
     * @nullable
     */
    creationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    /**
     * Customer Number.
     * Gives an alphanumeric key, which clearly identifies the customer or vendor in the SAP system.
     * Maximum length: 10.
     * @nullable
     */
    customer?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Payment Block.
     * @nullable
     */
    paymentIsBlockedForSupplier?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Central Posting Block.
     * Indicates that the account is blocked for posting for all company codes.
     * If you set this indicator, the system prevents users from posting items to this account and issues an error message to inform them that the account is blocked.
     * @nullable
     */
    postingIsBlocked?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Centrally imposed purchasing block.
     * Indicates whether or not the supplier master record is blocked for all departments (that is, whether or not posting to this record is allowed at all).
     * @nullable
     */
    purchasingIsBlocked?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Supplier Account Group.
     * The account group is a classifying feature within vendor master records. The account group determines:
     * the number interval for the account number of the vendor,whether the number is assigned by the user or by the system,which specifications are necessary and/or possible in the master record.
     * Maximum length: 4.
     * @nullable
     */
    supplierAccountGroup?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Supplier Full Name.
     * Maximum length: 220.
     * @nullable
     */
    supplierFullName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Name of Supplier.
     * Maximum length: 80.
     * @nullable
     */
    supplierName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * VAT Registration Number.
     * VAT registration number (VAT reg.no.) of the customer, vendor or your company code.
     * The VAT registration number is used within the EU for tax-exempt deliveries for the "EC sales list". The check rules are defined for each EU country and cannot be changed.
     * Maximum length: 20.
     * @nullable
     */
    vatRegistration?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Date of birth of the person subject to withholding tax.
     * @nullable
     */
    birthDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    /**
     * Cocatenated International Location Number.
     * Maximum length: 20.
     * @nullable
     */
    concatenatedInternationalLocNo?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Central Deletion Flag for Master Record.
     * Indicates that all data in this master record is to be deleted.
     * To delete this data, you have to run the archiving program for Accounts Receivable or Payable. This program will archive all master records marked for deletion provided that there is no dependent data in them.Deletion flags can also be used in the program for deleting master data. You should, however, run this program only to delete test data prior to production startup.
     * @nullable
     */
    deletionIndicator?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Account number of the master record with fiscal address.
     * Specifies an additional master record in which the official address is stored.
     * This address is used in Italy for business transactions with the tax office in Italy.
     * Maximum length: 10.
     * @nullable
     */
    fiscalAddress?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Industry key.
     * An industry is a distinct group of companies with the same basic business activity. The industry key is used in selecting data for evaluations (for example, a vendor master data list). You can specify industries such as trade, banking, service, manufacturing, health care, public service, media and so on.
     * The industry field belongs to the general data area of customer and vendor master records.
     * Maximum length: 4.
     * @nullable
     */
    industry?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * International location number  (part 1).
     * Here you enter the first 7 digits of the international location number.
     * The International Location Number (ILN) is assigned (in Germany by the Centrale for Coorganisation GmbH)) when a company is founded. It consists of 13 digits, the last digit being the check digit. There are two categories of location numbers:Participants who only need an ILN to cleary and unmistakably identify themselves for communication with the business partner are given a category 1 ILN. This cannot be used to identify articles by means of EAN.Participants who wish to assign the location numbers for their own enterprise areas are given a category 2 ILN. For a category 2 ILN, digits 1 to 7 are described as basis number. This is used as basis for the creation of article numbers (EAN).
     * Maximum length: 7.
     * @nullable
     */
    internationalLocationNumber1?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * International location number (Part 2).
     * Here, you enter digits 8-12 of the 13-digit international location number.
     * The international location number (ILN) is assigned when establishing a company (by the "Zentrale für Coorganisation GmbH" in Germany). It consists of 13 digits, the last of which is the check digit. There are two types of international location numbers:Subscribers who only need one ILN to identify themselves in communication with the business partner are given an ILN of type 1. These cannot be used for identifying articles by means of EAN.Subscribers who need to assign location numbers for their own company areas are given an ILN of type 2. Positions 1 through 7 of the ILN type 2 are known as the basis number. This basis number forms the basis for article numbers (EAN).
     * Maximum length: 5.
     * @nullable
     */
    internationalLocationNumber2?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Check digit for the international location number.
     * The check digit is derived from a special check digit procedure from digits of the previous international location numbers. In this way, you can check whether the ILN entered is actually valid.
     * Maximum length: 1.
     * @nullable
     */
    internationalLocationNumber3?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Natural Person.
     * Denotes a natural person.
     * In the following countries, the system needs to know whether the taxpayer is a legal or natural person so that it can check the tax numbers correctly:BrazilBulgariaColombiaCroatiaGreeceItalyMexicoPeruSloveniaThailandUkraineThe flag is also used in conjunction with the Statement of Payments to Natural Persons report, as used in the Czech Republic and in Slovakia. This report only covers customers and vendors for whom you have set this indicator.In South Korea, it is used in conjunction with the Generic Withholding Tax Reporting program.
     * Maximum length: 1.
     * @nullable
     */
    isNaturalPerson?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Tax Type.
     * Classification of companies according to tax aspects.
     * Maximum length: 2.
     * @nullable
     */
    responsibleType?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Validity Date of Certification.
     * Date up to which the certification of the QM-system is valid.
     * @nullable
     */
    suplrQltyInProcmtCertfnValidTo?: DeserializedType<T, 'Edm.DateTime'> | null;
    /**
     * Supplier's QM System.
     * If a QM system is maintained by the supplier, you can store a description of the QM system here.
     * If a material is activated for QM in procurement, the system initiates the following check whenever purchasing functions are carried out (for example, when a request for a quotation is made or if a purchase order is created):Whether the supplier's verified QM system, according to supplier master record or quality info record (for a combination of supplier/material) meets the requirements for QM systems as specified in the material master.When carrying out the check, the system relies on the defined assignments for target QM systems and actual QM systems in the Customizing application. When carrying out the check, the system relies on the assignments for target QM systems and actual QM systems defined in the configuration.If the check is unsuccessful, a warning message is issued when a request for quotation is initiated and an error message is issued for all other procurement activities.
     * Maximum length: 4.
     * @nullable
     */
    suplrQualityManagementSystem?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Group Key.
     * If the customer or the vendor belongs to a group, you can enter a group key here. The group key is freely assignable.
     * If you create a matchcode using this group key, group evaluations are possible.
     * Maximum length: 10.
     * @nullable
     */
    supplierCorporateGroup?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Function That Will Be Blocked.
     * Key that determines which procurement functions (for example, request for quotation, purchase order, or goods receipt) should be blocked for quality reasons.
     * You can enter a block key in the:Supplier master recordIn this case, the supplier block applies to all materials and plants.Quality info record for QM in procurementIn this case, the supplier block applies to a single material and plant.A block for quality reasons applies only to those materials for which QM in procurement is active.
     * Maximum length: 2.
     * @nullable
     */
    supplierProcurementBlock?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Tax Number 1.
     * Specifies the tax number.
     * Enter the appropriate tax number:Country/Region Tax NumberArgentina  CUIT number or CUIL numberBelgium Enterprise numberBrazil  CNPJ numberBulgaria Unified identification codeChile RUT numberChina VAT registration number (shui wu deng ji hao)Colombia NIT numberCroatia Legal persons: company identification numberNatural persons: JMBG numberCzech Republic  DIC numberFrance SIRET numberGreece Personal IDHungary  Tax numberItaly Fiscal codeKazakhstan RNN (obsolete)Mexico RFC numberNetherlands SI registration number (Aansluitnummer UWV) of chain- liability vendorNorway VAT numberPeru RUC numberPhilippines Taxpayer identification number (see below)Poland NIP numberPortugal  NIF numberRomania Tax numberRussia INNSlovakia  DIC numberSlovenia Tax numberSouth Korea Natural persons: Personal identification numberLegal persons: Corporation IDSpain NIF numberSwitzerland  UID numberTaiwan GUI registration numberThailand Personal IDTurkey Name of business partner's tax officeUkraine Taxpayer identification numberUnited Kingdom Company registration numberUnited States Social security numberVenezuela  RIF numberIn the Philippines, enter the taxpayer identification number with a V or N at the end, as follows:If the business partner is liable to VAT: 999-999-999-999VIf the business partner is not liable to VAT: 999-999-999-999N.
     * Maximum length: 16.
     * @nullable
     */
    taxNumber1?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Tax Number 2.
     * Specifies the tax number.
     * Enter the appropriate tax number:Country/Region Tax NumberArgentina NIP number or CM numberBelgium VAT numberBrazil  CPF numberBulgaria Legal persons: tax numberNatural persons: personal IDCroatia OIB number Czech Republic  ICO numberFrance SIREN numberGreece AFM numberIndia TINItaly  VAT numberKazakhstan BC (Beneficiary Code)Netherlands BSN numberNorway Organization registration numberRussia OKPO codeSlovakia  ICO numberSouth Korea VAT registration numberSweden Organization registration numberSwitzerland VAT numberTaiwan Tax registration numberUkraine Legal persons: USREOU numberNatural persons: SRNP numberTurkey Tax numberUnited Kingdom NI numberUnited States Employer identification numberVenezuela NIT number.
     * Maximum length: 11.
     * @nullable
     */
    taxNumber2?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Tax Number 3.
     * Specifies the tax number.
     * Enter the tax number that applies:Country Tax numberArgentina Withholding agent numberBrazil State tax numberBulgaria Social security numberMexico CURP numberKazakhstan BINNetherlands Tax registration number (Loonbelastingnummer) of the chain-liability vendorRussia KPP numberThailand Tax ID     Ukraine VAT registration number.
     * Maximum length: 18.
     * @nullable
     */
    taxNumber3?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Tax Number 4.
     * Specifies the tax number.
     * Enter the appropriate tax number:Country Tax NumberBrazil Municipal tax numberKazakhstan IINRussia OFK number (for public bodies only).
     * Maximum length: 18.
     * @nullable
     */
    taxNumber4?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Tax Number 5.
     * Kazakhstan
     * Specifies the certificate of registration as VAT payer in the following format: XXXXXYYYYYYYZZZZZZZZ, where: XXXXX is the certificate serial number, YYYYYYY is the certificate number and ZZZZZZZZ is the date of certificate issue.
     * Maximum length: 60.
     * @nullable
     */
    taxNumber5?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Tax Number at Responsible Tax Authority.
     * The tax number of the vendor at the responsible tax authority.
     * Maximum length: 18.
     * @nullable
     */
    taxNumberResponsible?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Tax Number Type.
     * Taxes in Argentina:
     * The format and the check of tax number 1 depend on the two-digit tax number type.The tax number type is an identification type for tax in Argentina (for example, 80 for CUIT) and is used for the DGI tax report.
     * Maximum length: 2.
     * @nullable
     */
    taxNumberType?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Supplier indicator relevant for proof of delivery.
     * This indicator controls the process of proof of delivery during the incoming goods process for inbound deliveries. Processing is activating by switching on this indicator in the supplier master and by switching on the corresponding indicator in the delivery item category.
     * There are the following different characteristics:' ':  not relevant for POD'A':  generally relevant for POD'B':  only relevant for POD if differences(Difference between notified quantity and actual quantity received).
     * Maximum length: 1.
     * @nullable
     */
    suplrProofOfDelivRlvtCode?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Tax Split.
     * Tax calculation for Brazil:
     * The IPI tax value is split up for this vendor. 50% of the calculated IPI tax value is posted as deductible input tax, 50% is deducted from the inventory posting or posting to expense account.
     * @nullable
     */
    brTaxIsSplit?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Instruction key for data medium exchange.
     * For automatic payment transactions, this field (along with the house bank country and the payment method determined by the payment program) controls which statements are given to the participating banks when carrying out the payment order. This field is used in countries such as Germany, Austria, the Netherlands, Spain, Norway, Finland, and Japan as well as for the internnational SWIFT format, MT100.
     * Selecting the instruction keyIf data medium exchange is used (as well as in special cases when using document-based payment orders) the instruction key must be maintained in the customer/vendor master record, or in the system configuration for data medium exchange data for the house bank. The following holds regarding the instruction key:If the instruction key is maintained in the master record, then this instruction key is used.If no instruction key exists in the vendor master record, then the default instruction key defined for the house bank is used.Consequently, it is not necessary to provide all business partners with an instruction key; only the exceptions need to be maintained.1If it is necessary to specify an instruction key for a business partner's house bank that differs from the instruction key defined in the master record, this can be done when editing the payment proposal.2The instruction key must be entered in the document for one-time accounts.3The four instruction key fields belonging to the instruction key can be overridden by entering instruction keys in the document (the "Additional Data" screen in the customer or vendor line).
     * Maximum length: 2.
     * @nullable
     */
    dataExchangeInstructionKey?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * One-to-many navigation property to the [[SupplierCompany]] entity.
     */
    toSupplierCompany: SupplierCompany<T>[];
    /**
     * One-to-many navigation property to the [[SupplierPurchasingOrg]] entity.
     */
    toSupplierPurchasingOrg: SupplierPurchasingOrg<T>[];
    /**
     * One-to-many navigation property to the [[SupplierText]] entity.
     */
    toSupplierText: SupplierText<T>[];
}
export interface SupplierType<T extends DeSerializers = DefaultDeSerializers> {
    supplier: DeserializedType<T, 'Edm.String'>;
    alternativePayeeAccountNumber?: DeserializedType<T, 'Edm.String'> | null;
    authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
    createdByUser?: DeserializedType<T, 'Edm.String'> | null;
    creationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    customer?: DeserializedType<T, 'Edm.String'> | null;
    paymentIsBlockedForSupplier?: DeserializedType<T, 'Edm.Boolean'> | null;
    postingIsBlocked?: DeserializedType<T, 'Edm.Boolean'> | null;
    purchasingIsBlocked?: DeserializedType<T, 'Edm.Boolean'> | null;
    supplierAccountGroup?: DeserializedType<T, 'Edm.String'> | null;
    supplierFullName?: DeserializedType<T, 'Edm.String'> | null;
    supplierName?: DeserializedType<T, 'Edm.String'> | null;
    vatRegistration?: DeserializedType<T, 'Edm.String'> | null;
    birthDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    concatenatedInternationalLocNo?: DeserializedType<T, 'Edm.String'> | null;
    deletionIndicator?: DeserializedType<T, 'Edm.Boolean'> | null;
    fiscalAddress?: DeserializedType<T, 'Edm.String'> | null;
    industry?: DeserializedType<T, 'Edm.String'> | null;
    internationalLocationNumber1?: DeserializedType<T, 'Edm.String'> | null;
    internationalLocationNumber2?: DeserializedType<T, 'Edm.String'> | null;
    internationalLocationNumber3?: DeserializedType<T, 'Edm.String'> | null;
    isNaturalPerson?: DeserializedType<T, 'Edm.String'> | null;
    responsibleType?: DeserializedType<T, 'Edm.String'> | null;
    suplrQltyInProcmtCertfnValidTo?: DeserializedType<T, 'Edm.DateTime'> | null;
    suplrQualityManagementSystem?: DeserializedType<T, 'Edm.String'> | null;
    supplierCorporateGroup?: DeserializedType<T, 'Edm.String'> | null;
    supplierProcurementBlock?: DeserializedType<T, 'Edm.String'> | null;
    taxNumber1?: DeserializedType<T, 'Edm.String'> | null;
    taxNumber2?: DeserializedType<T, 'Edm.String'> | null;
    taxNumber3?: DeserializedType<T, 'Edm.String'> | null;
    taxNumber4?: DeserializedType<T, 'Edm.String'> | null;
    taxNumber5?: DeserializedType<T, 'Edm.String'> | null;
    taxNumberResponsible?: DeserializedType<T, 'Edm.String'> | null;
    taxNumberType?: DeserializedType<T, 'Edm.String'> | null;
    suplrProofOfDelivRlvtCode?: DeserializedType<T, 'Edm.String'> | null;
    brTaxIsSplit?: DeserializedType<T, 'Edm.Boolean'> | null;
    dataExchangeInstructionKey?: DeserializedType<T, 'Edm.String'> | null;
    toSupplierCompany: SupplierCompanyType<T>[];
    toSupplierPurchasingOrg: SupplierPurchasingOrgType<T>[];
    toSupplierText: SupplierTextType<T>[];
}
// # sourceMappingURL=Supplier.d.ts.map
