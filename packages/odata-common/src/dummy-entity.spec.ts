import {Constructable, EntityBase, EntityBuilderType} from "./entity-base";
import {CustomField} from "./selectable/custom-field";
import {FieldBuilder} from "./selectable/field-builder";
import {Field, FieldOptions} from "./selectable/field";
import {EdmTypeField} from "./selectable/edm-type-field";
import {ComplexTypeField} from "./selectable/complex-type-field";
import {ConstructorOrField} from "./selectable/constructor-or-field";
import {PropertyMetadata} from "./selectable/complex-type-namespace";
import {RequestBuilder} from "@sap-cloud-sdk/odata-common";
import {TestEntity} from "@sap-cloud-sdk/test-services/v2/test-service";
import {GetByKeyRequestBuilderBase} from "./request-builder/get-by-key-request-builder-base";
import {GetAllRequestBuilderBase} from "./request-builder/get-all-request-builder-base";

export interface DummyComplexType {
    stringProperty: string;
    booleanProperty?: boolean;
}
export class DummyComplexTypeField<EntityT extends EntityBase> extends ComplexTypeField<EntityT, DummyComplexType, true, true> {
    private _fieldBuilder: FieldBuilder<this> = new FieldBuilder(this);
    stringProperty: EdmTypeField<EntityT, 'Edm.String', false, false> =
        this._fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', false);

    booleanProperty: EdmTypeField<EntityT, 'Edm.Boolean', true, false> =
        this._fieldBuilder.buildEdmTypeField(
            'BooleanProperty',
            'Edm.Boolean',
            true
        );
    constructor(
        fieldName: string,
        fieldOf: ConstructorOrField<EntityT>,
        fieldOptions?: FieldOptions<true, true>
    ) {
        super(fieldName, fieldOf, TestComplexType, fieldOptions);
    }
}
export namespace TestComplexType {
    export const _propertyMetadata: PropertyMetadata<DummyComplexType>[] = [
        {
            originalName: 'StringProperty',
            name: 'stringProperty',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'BooleanProperty',
            name: 'booleanProperty',
            type: 'Edm.Boolean',
            isCollection: false
        }
    ];
}

export class DummyEntity extends EntityBase{
    readonly _oDataVersion: any;
    stringProperty:string;
    int16Property:number;
    static _entityName = 'DummyEntity';
    static _defaultServicePath ='/dummy/service/path'

    static requestBuilder(): any {
        throw new Error('not implemented')
    }

    static customField(fieldName: string): CustomField<DummyEntity> {
        throw new Error('not implemented')
    }
    static builder():EntityBuilderType<DummyEntity, DummyEntityType> {
        return  EntityBase.entityBuilder(DummyEntity)
    }
}
export interface DummyEntityType {
    stringProperty:string;
    int16Property:number;
}
export namespace DummyEntity{
    const _fieldBuilder: FieldBuilder<Constructable<DummyEntity>> =
        new FieldBuilder(DummyEntity);

    export const _keyFields: Array<Field<DummyEntity, boolean, boolean>> = [  ];
    export const _keys: { [keys: string]: Field<DummyEntity, boolean, boolean> } = {}
    export const STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
        'StringProperty',
        'Edm.String',
        true
    );
    export const INT_16_PROPERTY = _fieldBuilder.buildEdmTypeField(
        'Int16Property',
        'Edm.Int16',
        true
    );
    export const COMPLEX_TYPE_PROPERTY = _fieldBuilder.buildComplexTypeField(
        'ComplexTypeProperty',
        DummyComplexTypeField,
        true
    );

    export const _allFields: Array<
        | EdmTypeField<DummyEntity, 'Edm.String', true, true>
        | EdmTypeField<DummyEntity, 'Edm.Int16', true, true>
        | DummyComplexTypeField<DummyEntity>> =[ DummyEntity.STRING_PROPERTY,    DummyEntity.INT_16_PROPERTY,DummyEntity.COMPLEX_TYPE_PROPERTY]
}


