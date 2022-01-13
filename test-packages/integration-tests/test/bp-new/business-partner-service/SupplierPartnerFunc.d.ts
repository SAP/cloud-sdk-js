import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';
/**
 * This class represents the entity "A_SupplierPartnerFunc" of service "API_BUSINESS_PARTNER".
 */
export declare class SupplierPartnerFunc<T extends DeSerializers = DefaultDeSerializers> extends Entity implements SupplierPartnerFuncType<T> {
    /**
     * Technical entity name for SupplierPartnerFunc.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the SupplierPartnerFunc entity
     */
    static _keys: string[];
    /**
     * Account Number of Supplier.
     * Specifies an alphanumeric key that uniquely identifies the supplier in the SAP system.
     * Maximum length: 10.
     */
    supplier: DeserializedType<T, 'Edm.String'>;
    /**
     * Purchasing Organization.
     * Denotes the purchasing organization.
     * Maximum length: 4.
     */
    purchasingOrganization: DeserializedType<T, 'Edm.String'>;
    /**
     * Supplier Subrange.
     * Subdivision of a supplier's overall product range according to various criteria.
     * For each supplier sub-range:The master data is kept on a common basisCertain conditions applyIn the supplier master, you can create different purchasing data and different  partner functions for each  supplier sub-range.You can also maintain and change the conditions for each supplier sub-range. You assign a material to a supplier sub-range in the info record.In the supplier master, you can maintain different data for particular supplier sub-ranges, such as ordering addresses or terms of payment, for example.When creating a purchase order with a known supplier, different data is only determined if the supplier sub-range is entered in the initial screen.Your supplier Smith in Houston has two sub-ranges: paint and glue.All materials from the "paint" sub-range are ordered in Houston.You have maintained an alternative ordering address in Detroit for the "glue" sub-range.If you order materials from the "glue" sub-range, the supplier sub-range finds the Detroit ordering address.
     * Maximum length: 6.
     */
    supplierSubrange: DeserializedType<T, 'Edm.String'>;
    /**
     * Plant.
     * Key uniquely identifying a plant.
     * Maximum length: 4.
     */
    plant: DeserializedType<T, 'Edm.String'>;
    /**
     * Partner Function.
     * The abbreviated form of the name that identifies the partner function.
     * Maximum length: 2.
     */
    partnerFunction: DeserializedType<T, 'Edm.String'>;
    /**
     * Partner counter.
     * The sequential number that the system applies when there is more than one partner for a particular partner function.
     * When you create a sales order for a particular customer, there may be more than one ship-to party defined. The different ship-to parties are numbered sequentially.
     * Maximum length: 3.
     */
    partnerCounter: DeserializedType<T, 'Edm.String'>;
    /**
     * Default Partner.
     * Specifies a partner as the default for a particular partner function.
     * When you enter more than one partner for a particular partner function (for example, you define three different ship-to parties), you can select one partner as the default. During sales or purchasing processing, if you have defined multiple partners for a partner function, the system prompts you to choose just one partner. The system presents the default partner as the first choice in the pop-up window.
     * @nullable
     */
    defaultPartner?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Record Created On.
     * @nullable
     */
    creationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    /**
     * Name of Person Responsible for Creating the Object.
     * Maximum length: 12.
     * @nullable
     */
    createdByUser?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Reference to other supplier.
     * Maximum length: 10.
     * @nullable
     */
    referenceSupplier?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Authorization Group.
     * The authorization group allows extended authorization protection for particular objects. The authorization groups are freely definable. The authorization groups usually occur in authorization objects together with an activity.
     * Maximum length: 4.
     * @nullable
     */
    authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
}
export interface SupplierPartnerFuncType<T extends DeSerializers = DefaultDeSerializers> {
    supplier: DeserializedType<T, 'Edm.String'>;
    purchasingOrganization: DeserializedType<T, 'Edm.String'>;
    supplierSubrange: DeserializedType<T, 'Edm.String'>;
    plant: DeserializedType<T, 'Edm.String'>;
    partnerFunction: DeserializedType<T, 'Edm.String'>;
    partnerCounter: DeserializedType<T, 'Edm.String'>;
    defaultPartner?: DeserializedType<T, 'Edm.Boolean'> | null;
    creationDate?: DeserializedType<T, 'Edm.DateTime'> | null;
    createdByUser?: DeserializedType<T, 'Edm.String'> | null;
    referenceSupplier?: DeserializedType<T, 'Edm.String'> | null;
    authorizationGroup?: DeserializedType<T, 'Edm.String'> | null;
}
// # sourceMappingURL=SupplierPartnerFunc.d.ts.map
