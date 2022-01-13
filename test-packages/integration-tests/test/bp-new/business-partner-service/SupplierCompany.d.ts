import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';
import { SupplierCompanyText, SupplierCompanyTextType } from './SupplierCompanyText';
import { Supplier, SupplierType } from './Supplier';
import { SupplierDunning, SupplierDunningType } from './SupplierDunning';
import { SupplierWithHoldingTax, SupplierWithHoldingTaxType } from './SupplierWithHoldingTax';
/**
 * This class represents the entity "A_SupplierCompany" of service "API_BUSINESS_PARTNER".
 */
export declare class SupplierCompany<T extends DeSerializers = DefaultDeSerializers> extends Entity implements SupplierCompanyType<T> {
    /**
     * Technical entity name for SupplierCompany.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the SupplierCompany entity
     */
    static _keys: string[];
    /**
     * Account Number of Supplier.
     * Specifies an alphanumeric key that uniquely identifies the supplier in the SAP system.
     * Maximum length: 10.
     */
    supplier: DeserializedType<T, 'Edm.String'>;
    /**
     * Company Code.
     * The company code is an organizational unit within financial accounting.
     * Maximum length: 4.
     */
    companyCode: DeserializedType<T, 'Edm.String'>;
    /**
     * Authorization Group.
     * The authorization group allows extended authorization protection for particular objects. The authorization groups are freely definable. The authorization groups usually occur in authorization objects together with an activity.
     * Maximum length: 4.
     * @nullable
     */
    authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Name of Company Code or Company.
     * Maximum length: 25.
     * @nullable
     */
    companyCodeName?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Block Key for Payment.
     * Block key (enqueue key) that is used to block an open item or an account to payment transactions.
     * You can use the block key as described below.Automatic Payment TransactionsIn automatic payment transactions, the block takes effect when it is entered in the system as follows:In the master recordIn the documentIf you enter the block in the master record then all open items for this account are contained in the exception list.The following block keys have a special meaning in the master record:The block key * has the effect that all items of the account are skipped in automatic payment transactions.The block key + has the effect that all items are skipped in which a payment method was not entered explicitly.The block key A is always set automatically when a down payment is entered. Therefore, you must not delete the block key A or use it for other purposes.Whether a block key can be set or removed in payment proposal processing depends on the attribute Changeable in payment proposal of the block key.Manual PaymentsManual payments are only affected by a block key in the document if you set the attribute Blocked for manual payments in the block key.A block key that was set in the master record does not have any effect on manual payments. You can have the system issue a warning message in that case. To do so, you have to make system settings. Set up message 671 of work area F5 in the configuration step Change Message Control, udter Finance -&gt; Localization -&gt; General Settings.Release for PaymentIf you want to use a block key for payment release in accounting, then you have to set the attribute Not Changeable for the block key. You make this setting in the configuration step Control Payment Block Reasons, under Finance -&gt; Accounts Payable -&gt; General Payment Settings.
     * Maximum length: 1.
     * @nullable
     */
    paymentBlockingReason?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Posting block for company code.
     * Indicates that the account is blocked for posting in the specified company code.
     * If you set this indicator, the system prevents users from posting items to this account and issues an error message to inform them that the account is blocked.
     * @nullable
     */
    supplierIsBlockedForPosting?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Accounting Clerk Abbreviation.
     * Identification code for the accounting clerk.
     * The name of the accounting clerk defined by this identification code can be used in the payment program for correspondence and reporting (for example, open item lists).
     * Maximum length: 2.
     * @nullable
     */
    accountingClerk?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Accounting clerk's fax number at the customer/vendor.
     * Maximum length: 31.
     * @nullable
     */
    accountingClerkFaxNumber?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Accounting clerk's telephone number at business partner.
     * Maximum length: 30.
     * @nullable
     */
    accountingClerkPhoneNumber?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Clerk at vendor.
     * Name or identification code of the accounting clerk at the vendor.
     * Maximum length: 15.
     * @nullable
     */
    supplierClerk?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Internet address of partner company clerk.
     * Maximum length: 130.
     * @nullable
     */
    supplierClerkUrl?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * List of Respected Payment Methods.
     * List of payment methods which may be used in automatic payment transactions with this customer/vendor if you do not specify a payment method in the item to be paid.
     * If you do specify a particular payment method in the item to be paid, this specification has priority over the specifications in the master record. You may also specify payment methods in the item which are not listed in the master record.
     * Maximum length: 10.
     * @nullable
     */
    paymentMethodsList?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Terms of Payment Key.
     * Key for defining payment terms composed of cash discount percentages and payment periods.
     * It is used in sales orders, purchase orders, and invoices. Terms of payment provide information for:Cash managementDunning proceduresPayment transactionsData can be entered in the field for the terms of payment key in various ways as you enter a business transaction:In most business transactions, the system defaults the key specified in the master record of the customer/vendor in question.In some transactions (for example, credit memos), however, the system does not default the key from the master record. Despite this, you can use the key from the customer/vendor master record by entering "*" in the field.Regardless of whether or not a key is defaulted from the master record, you can manually enter a key during document entry at:item level in sales ordersheader level in purchase orders and invoicesMaster records have separate areas for Financial Accounting, Sales, and Purchasing. You can specify different terms of payment keys in each of these areas. When you then enter a business transaction, the application in question will use the key specified in its area of the master record.
     * Maximum length: 4.
     * @nullable
     */
    paymentTerms?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Indicator: Clearing between customer and vendor?.
     * Indicates that during automatic payment transactions, clearing is made with the corresponding customer account, and that during manual clearing procedures, the items of that customer account are also selected.
     * To use this function in automatic payment transactions, you have toenter the customer account number in the vendor master record,enter the vendor account number in the customer master record, andselect the "Clearing with vendor" indicator in the customer master record.If this indicator is set, items belonging to the customer account will be included in any dunning run.
     * @nullable
     */
    clearCustomerSupplier?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Indicator: Local processing?.
     * Indicates that payment transactions and dunning notices are created for the branch.
     * Normally automatic payment transactions and dunning notices are created for the head office.NoteSelect this indicator only if this account is a head office account.
     * @nullable
     */
    isToBeLocallyProcessed?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Indicator: Pay all items separately ?.
     * If this indicator is set, every customer/vendor open item is paid separately during automatic payment transactions. This means that open items are not grouped together for payment.
     * @nullable
     */
    itemIsToBePaidSeparately?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Indicator: Send Payment Advices by EDI.
     * This indicator specifies that the customer/vendor should be sent all payment advice information by EDI.
     * @nullable
     */
    paymentIsToBeSentByEdi?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Short Key for a House Bank.
     * All bank data is determined using this key.
     * Maximum length: 5.
     * @nullable
     */
    houseBank?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Probable time until check is paid.
     * Number of days which usually pass until the vendor has cashed your check.
     * During automatic payment transactions, the system calculates the value date for check payments using this information and stores the date in the line item. The date is calculated as follows:Value date = posting date + check cashing timeIn Cash Management, the value date is used as information about the expected cash outflow.
     * @nullable
     */
    checkPaidDurationInDays?: DeserializedType<T, 'Edm.Decimal'> | null;
    /**
     * Currency Key.
     * Currency key for amounts in the system.
     * Maximum length: 5.
     * @nullable
     */
    currency?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Bill of Exchange Limit (in Local Currency).
     * Maximum amount which may be issued on a bill of exchange if it is to be used in payment transactions with the business partner.
     * The amount limit is taken into consideration in automatic payment transactions for payments by bill of exchange and bill of exchange payment requests. Several bill of exchange forms are created if the amount to be settled is higher than the maximum amount given here. Each of these bills of exchange is issued for the maximum amount or for a smaller amount.Amount limits for bills of exchange are used in Spain, for example.
     * @nullable
     */
    billOfExchLmtAmtInCoCodeCrcy?: DeserializedType<T, 'Edm.Decimal'> | null;
    /**
     * Our account number with the vendor.
     * This field contains the account number the company is listed under at the vendor.
     * Maximum length: 12.
     * @nullable
     */
    supplierClerkIdBySupplier?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Reconciliation Account in General Ledger.
     * The reconciliation account in G/L accounting is the account which is updated parallel to the subledger account for normal postings (for example, invoice or payment).
     * For special postings (for example, down payment or bill of exchange), this account is replaced by another account (for example, 'down payments received' instead of 'receivables').The replacement takes place due to the special G/L indicator which you must specify for these types of postings.
     * Maximum length: 10.
     * @nullable
     */
    reconciliationAccount?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Interest Indicator.
     * You enter an interest indicator here if you want the business partner to be included in automatic interest calculation.
     * Maximum length: 2.
     * @nullable
     */
    interestCalculationCode?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Key date of the last interest calculation.
     * The date in this field displays the last time the interest calculation program processed this account. This is generally the upper limit of the last interest run.
     * Generally, this date is automatically maintained by the program (batch input). A manual entry in this field should only be made if an error has occurred or when implementing the interest calculation.
     * @nullable
     */
    interestCalculationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    /**
     * Interest Calculation Frequency in Months.
     * An entry in this field determines the intervals (in months) at which interest is to be calculated automatically for this account (account balance interest calculation). The interest calculation frequency is added to the date of the last interest calculation.
     * Date of last interest calculation: 3/31.+ 01 month interest calculation frequency= 4/30 upper limit for the current interest runThe calculation period specified as a report parameter determines whether an account is included in an interest run.The upper limit of the interest run is calculated as in the above example and compared with the upper limit of the calculation entered in the interest run (report parameter). If the calculated upper limit is after the calculation period, the account is not included in interest calculation.If you maintain the interest calculation frequency in the account master record, this entry is used to calculate the upper limit. If not, the interest calculation frequency entered for the interest indicator is used.
     * Maximum length: 2.
     * @nullable
     */
    intrstCalcFrequencyInMonths?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Head office account number.
     * This field contains the account number of the master record for the head office account.
     * You specify this account number only for branch accounts. Items that you post using the branch account number are automatically posted to the head office account. The system records the branch account number in the line items.Neither transactions nor balances are kept in the branch account.
     * Maximum length: 10.
     * @nullable
     */
    supplierHeadOffice?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Account number of the alternative payee.
     * The account number of the vendor with whom automatic payment transactions are to be carried out.
     * The field is only needed if payments are not to be made directly to the vendor to whom the payable is owed. The same applies to bank collections of receivables.The specification in this field applies only to the company code. There is a further field in which you can enter an alternative payee for each company code. If both fields are filled, the company code specified has priority.
     * Maximum length: 10.
     * @nullable
     */
    alternativePayee?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Key for Sorting According to Assignment Numbers.
     * Indicates the layout rule for the Allocation field in the document line item.
     * The system uses a standard sort sequence for displaying line items. Among other things, it sorts the items according to the content of the Allocation field. This field can be filled either manually or automatically (by the system) when a document line item is entered.For this purpose, the system requires rules that determine which information is to be taken from the document header or from the document line item and placed in the field. The rules can be stored in the master record of an account which enables you to determine the standard sort sequence on an account-specific basis.NoteField information from another document line item cannot be adopted into the field of a particular item.
     * Maximum length: 3.
     * @nullable
     */
    layoutSortingRule?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Tolerance group for the business partner/G/L account.
     * Contains settings that control how the system handles differences between the invoice amount and the amount received from a customer or the amount paid to a supplier. A tolerance group is unique within a company code.
     * Maximum length: 4.
     * @nullable
     */
    aparToleranceGroup?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Certification date.
     * US government requirement.
     * Date field in which to enter certification date for small companies run by women or minorities. This certificate must be renewed every two years.
     * @nullable
     */
    supplierCertificationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    /**
     * Memo.
     * Internal memo of the accounting department.
     * The memo serves only as information on special features of the customer/vendor.
     * Maximum length: 30.
     * @nullable
     */
    supplierAccountNote?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Withholding Tax Country/Region Key.
     * In some countries/regions, an additional country/region is needed for calculating or reporting withholding tax.
     * The calculation can depend on the payee's country/region.A particular country/region key can be required by law for reporting which may possibly be different to the key used in the address.Examples: Japan, USA (1042), Argentina.
     * Maximum length: 3.
     * @nullable
     */
    withholdingTaxCountry?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Deletion Flag for Master Record (Company Code Level).
     * Indicates that the company code data in this master record is to be deleted.
     * To delete this data, you have to run the archiving program for Accounts Receivable or Payable. This program will archive all master records marked for deletion provided that there is no dependent data in them.This deletion flag cannot be used in the program that deletes master data. You should, however, run this program only to delete test data prior to production startup.
     * @nullable
     */
    deletionIndicator?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Planning group.
     * In cash management, customers and vendors are allocated to planning groups by means of an entry made in the master record.
     * You can define these planning groups in Customizing or the Implementation Guide (you will need to ensure that they are all the same length). In order to improve the liquidity forecast display for major customers and vendors, it can be advisable to enter their account number as the planning group.For the planning groups themselves a naming convention should be set up to improve liquidity forecasting. In the following examples, the customer planning groups begin with an "R" for receipts, and the vendor planning groups begin with an "E" for expenses.R1  Customers paying by bank collectionR2  Other domestic customersR3  Customers abroadR4  Affiliated company customersR5  High risk customersR6  Major customersR7  Rental incomeR8  Repayment of loans...E1  Domestic vendorsE2  Vendors abroadE3  Affiliated company vendorsE4  Major vendorsE5  Personnel costsE6  TaxesE7  Investments...
     * Maximum length: 10.
     * @nullable
     */
    cashPlanningGroup?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Check Flag for Double Invoices or Credit Memos.
     * When incoming invoices are entered or when memos are entered in Financial Accounting (FI), the system checks whether an invoice or credit memo has already been entered for the same date.
     * Checking Logistics DocumentsThe system checks whether the invoice documents have already been entered in the Logistics invoice verification. For this, the system checks invoices that have been held or parked or that contain errors, or invoices that were entered for invoice verification in the background. The check is performed only if you specify the reference document number when you enter the invoices.When checking for duplicate invoices, the system compares the following specified characteristics:VendorCurrencyCompany CodeGross Invoice AmountReference Document NumberInvoice Document DateIf all of these characteristics are the same, the system issues a message for which you can change the message type in Customizing.When you enter credit memos or subsequent adjustments, the system does not check for duplicate invoices.Exception: For Argentina, invoices and credit memos are checked for duplicates.No message is issued if you enter a document that has previously been reversed.In Customizing for Logistics Invoice Verification under Incoming Invoice -&gt; Set Check for Duplicate Invoices, you can specify that the following characteristics are not checked:Reference Document NumberInvoice Document DateCompany CodeHaving fewer attributes to check increases the likelihood that the system will find a duplicate invoice.Example:The following document has already been entered and posted:Reference Document Number 333Invoice Date: 4/28/2000Gross Invoice Amount 100.00Currency: EURVendor: SpencerCompany Code: ChicagoYou have set up the check for duplicate invoices as follows in Customizing:The characteristics Reference Document Number and Company Code are not activated. Consequently, these characteristics are not checked.Now you enter the following invoice:Reference Document Number 334Invoice Date: 4/28/2000Gross Invoice Amount 100.00Currency: EURVendor: SpencerCompany Code: FlagstaffResultBecause you entered a reference document when you entered the invoice, the system checks for duplicate invoices. Compared against the invoice entered earlier, the invoice just entered has different values in the characteristics Reference and Company Code. However, these characteristics are not checked due to the settings that you have made in Customizing. All other characteristics are the same. The system issues a message telling you that an invoice has been entered twice.If the characteristic "Reference Document Number" had been selected in Customizing, the system would have checked the reference document number and established that it was different from the invoice entered earlier, and it consequently would not have issued a message.Checking FI DocumentsThe system checks whether there are FI documents that were posted or parked with the Logistics invoice verification or with an FI invoice transaction. Depending on the entry in the Reference field, one of the following checks is performed:If a reference number was specified in the sequential invoice/credit memo, the system checks whether an invoice/credit memo has already been posted for which all the following attributes agree:Company CodeVendorCurrencyDocument DateReference NumberIf no reference number was specified in the sequential invoice/credit memo, the system checks whether an invoice/credit memo has already been posted for which all the following attributes agree:Company CodeVendorCurrencyDocument DateAmount in Document CurrencyIn Materials Management, the system applies the check for duplicate invoices for invoices only, not for credit memos.
     * @nullable
     */
    isToBeCheckedForDuplicates?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Minority Indicators.
     * Maximum length: 3.
     * @nullable
     */
    minorityGroup?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Supplier Account Group.
     * The account group is a classifying feature within vendor master records. The account group determines:
     * the number interval for the account number of the vendor,whether the number is assigned by the user or by the system,which specifications are necessary and/or possible in the master record.
     * Maximum length: 4.
     * @nullable
     */
    supplierAccountGroup?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * One-to-many navigation property to the [[SupplierCompanyText]] entity.
     */
    toCompanyText: SupplierCompanyText<T>[];
    /**
     * One-to-one navigation property to the [[Supplier]] entity.
     */
    toSupplier?: Supplier<T> | null;
    /**
     * One-to-many navigation property to the [[SupplierDunning]] entity.
     */
    toSupplierDunning: SupplierDunning<T>[];
    /**
     * One-to-many navigation property to the [[SupplierWithHoldingTax]] entity.
     */
    toSupplierWithHoldingTax: SupplierWithHoldingTax<T>[];
}
export interface SupplierCompanyType<T extends DeSerializers = DefaultDeSerializers> {
    supplier: DeserializedType<T, 'Edm.String'>;
    companyCode: DeserializedType<T, 'Edm.String'>;
    authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
    companyCodeName?: DeserializedType<T, 'Edm.String'> | null;
    paymentBlockingReason?: DeserializedType<T, 'Edm.String'> | null;
    supplierIsBlockedForPosting?: DeserializedType<T, 'Edm.Boolean'> | null;
    accountingClerk?: DeserializedType<T, 'Edm.String'> | null;
    accountingClerkFaxNumber?: DeserializedType<T, 'Edm.String'> | null;
    accountingClerkPhoneNumber?: DeserializedType<T, 'Edm.String'> | null;
    supplierClerk?: DeserializedType<T, 'Edm.String'> | null;
    supplierClerkUrl?: DeserializedType<T, 'Edm.String'> | null;
    paymentMethodsList?: DeserializedType<T, 'Edm.String'> | null;
    paymentTerms?: DeserializedType<T, 'Edm.String'> | null;
    clearCustomerSupplier?: DeserializedType<T, 'Edm.Boolean'> | null;
    isToBeLocallyProcessed?: DeserializedType<T, 'Edm.Boolean'> | null;
    itemIsToBePaidSeparately?: DeserializedType<T, 'Edm.Boolean'> | null;
    paymentIsToBeSentByEdi?: DeserializedType<T, 'Edm.Boolean'> | null;
    houseBank?: DeserializedType<T, 'Edm.String'> | null;
    checkPaidDurationInDays?: DeserializedType<T, 'Edm.Decimal'> | null;
    currency?: DeserializedType<T, 'Edm.String'> | null;
    billOfExchLmtAmtInCoCodeCrcy?: DeserializedType<T, 'Edm.Decimal'> | null;
    supplierClerkIdBySupplier?: DeserializedType<T, 'Edm.String'> | null;
    reconciliationAccount?: DeserializedType<T, 'Edm.String'> | null;
    interestCalculationCode?: DeserializedType<T, 'Edm.String'> | null;
    interestCalculationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    intrstCalcFrequencyInMonths?: DeserializedType<T, 'Edm.String'> | null;
    supplierHeadOffice?: DeserializedType<T, 'Edm.String'> | null;
    alternativePayee?: DeserializedType<T, 'Edm.String'> | null;
    layoutSortingRule?: DeserializedType<T, 'Edm.String'> | null;
    aparToleranceGroup?: DeserializedType<T, 'Edm.String'> | null;
    supplierCertificationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    supplierAccountNote?: DeserializedType<T, 'Edm.String'> | null;
    withholdingTaxCountry?: DeserializedType<T, 'Edm.String'> | null;
    deletionIndicator?: DeserializedType<T, 'Edm.Boolean'> | null;
    cashPlanningGroup?: DeserializedType<T, 'Edm.String'> | null;
    isToBeCheckedForDuplicates?: DeserializedType<T, 'Edm.Boolean'> | null;
    minorityGroup?: DeserializedType<T, 'Edm.String'> | null;
    supplierAccountGroup?: DeserializedType<T, 'Edm.String'> | null;
    toCompanyText: SupplierCompanyTextType<T>[];
    toSupplier?: SupplierType<T> | null;
    toSupplierDunning: SupplierDunningType<T>[];
    toSupplierWithHoldingTax: SupplierWithHoldingTaxType<T>[];
}
// # sourceMappingURL=SupplierCompany.d.ts.map
