/* eslint-disable max-classes-per-file */

import { EdmTypeShared } from '../edm-types';
import { Entity } from '../entity';
import { ComplexTypeField } from './complex-type-field';
import {
  EdmTypeField,
  SelectableEdmTypeField as SelectableEdmTypeFieldI,
  isSortableEdmType,
  SortableEdmType
} from './edm-type-field';
import { GreaterOrLessEdmTypeField } from './greater-or-less';
import { CollectionField } from './collection-field';
import { AllFields } from './all-fields';
import { ConstructorOrField } from './constructor-or-field';

export class SelectableEdmTypeField<
    EntityT extends Entity,
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean
  >
  extends EdmTypeField<EntityT, EdmT, NullableT>
  implements SelectableEdmTypeFieldI
{
  readonly selectable: true;
}

/**
 * Represents a selectable property with a number value.
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class SelectableGreaterOrLessEdmTypeField<
    EntityT extends Entity,
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean
  >
  extends GreaterOrLessEdmTypeField<EntityT, EdmT, NullableT>
  implements SelectableEdmTypeFieldI
{
  readonly selectable: true;
}

// eslint-disable-next-line @typescript-eslint/ban-types
type Constructor<T = {}> = new (...args: any[]) => T;
// type EdmFieldTypeCtor = Constructor<EdmTypeField<any, any>>;

function SelectableMixin<BaseT extends Constructor>(base: BaseT) {
  return class extends base implements SelectableEdmTypeFieldI {
    readonly selectable: true;
  };
}

// const SelectableEdmTypeField = SelectableMixin(EdmTypeField);
// export type AnyFunction<A = any> = (...input: any[]) => A
// export type AnyConstructor<A = object> = new (...input: any[]) => A

// export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>

// export type MyMixinType = Mixin<typeof SelectableMixin>

// interface SelectableEdmTypeField<EntityT extends Entity, FieldT extends FieldType> {}

export class FieldBuilder<
  EntityT extends Entity
  // FieldOfT extends Entity | ComplexTypeField<any, any, any> // entity instance type OR complex type
  // FieldOfComplexT = any
> {
  constructor(private fieldOf: ConstructorOrField<EntityT>) {}

  buildEdmTypeField<
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean
  >(
    fieldName: string,
    edmType: EdmT,
    isNullable: NullableT
  ): EdmTypeClassByType<EntityT, EdmT, NullableT> {
    if (this.fieldOf instanceof ComplexTypeField) {
      return this.buildComplexTypeEdmTypeField(fieldName, edmType, isNullable);
    }
    return this.buildEntityEdmTypeField(fieldName, edmType, isNullable);
  }

  // buildComplexTypeField<
  //   NullableT extends boolean,
  //   ComplexT extends Record<string, any>
  // >(
  //   fieldName: string,
  //   complexType: ComplexTypeNamespace<ComplexT>,
  //   isNullable: NullableT
  // ): ComplexTypeField<
  //   EntityT,
  //   ComplexTypeFieldType<FieldOfT>,
  //   ComplexT,
  //   NullableT
  // > {
  //   return new ComplexTypeField(
  //     fieldName,
  //     this.fieldOf,
  //     complexType,
  //     isNullable
  //   );
  // }

  buildEdmCollectionField<
    CollectionFieldT extends EdmTypeShared<'any'> | Record<string, any>,
    NullableT extends boolean
  >(
    fieldName: string,
    collectionFieldType: CollectionFieldT,
    isNullable: NullableT
  ): CollectionField<EntityT, CollectionFieldT, NullableT> {
    return new CollectionField(
      fieldName,
      this.fieldOf,
      collectionFieldType,
      isNullable
    );
  }

  buildAllFieldsField(): AllFields<EntityT> {
    return new AllFields('*', this.fieldOf as any); // TODO
  }

  private buildEntityEdmTypeField<
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean
  >(
    fieldName: string,
    edmType: EdmT,
    isNullable: NullableT
  ): EdmTypeClassByType<EntityT, EdmT, NullableT> {
    if (isSortableEdmType(edmType)) {
      return new SelectableGreaterOrLessEdmTypeField(
        fieldName,
        this.fieldOf,
        edmType,
        isNullable
      ) as EdmTypeClassByType<EntityT, EdmT, NullableT>;
    }
    return new SelectableEdmTypeField(
      fieldName,
      this.fieldOf,
      edmType,
      isNullable
    ) as EdmTypeClassByType<EntityT, EdmT, NullableT>;
  }

  private buildComplexTypeEdmTypeField<
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean
  >(
    fieldName: string,
    edmType: EdmT,
    isNullable: NullableT
  ): EdmTypeClassByType<EntityT, EdmT, NullableT> {
    if (isSortableEdmType(edmType)) {
      return new GreaterOrLessEdmTypeField(
        fieldName,
        this.fieldOf,
        edmType,
        isNullable
      ) as EdmTypeClassByType<EntityT, EdmT, NullableT>;
    }
    return new EdmTypeField(
      fieldName,
      this.fieldOf,
      edmType,
      isNullable
    ) as EdmTypeClassByType<EntityT, EdmT, NullableT>;
  }
}

export type EdmTypeClassByType<
  EntityT extends Entity,
  // FieldOfT extends Entity | ComplexTypeField<any, any, any>,
  EdmT extends EdmTypeShared<'any'>,
  NullableT extends boolean
> = EntityT extends Entity
  ? EdmT extends SortableEdmType
    ? SelectableGreaterOrLessEdmTypeField<EntityT, EdmT, NullableT>
    : SelectableEdmTypeField<EntityT, EdmT, NullableT>
  : EdmT extends SortableEdmType
  ? GreaterOrLessEdmTypeField<EntityT, EdmT, NullableT>
  : EdmTypeField<EntityT, EdmT, NullableT>;

// export const fieldFactory = {
//   fieldBuilder<EntityT extends Entity, ComplexT>(
//     fieldName: string,
//     entityConstructor: Constructable<EntityT>
//   ): FieldBuilder<EntityT, ComplexT> {
//     return new FieldBuilder(fieldName, entityConstructor);
//   }
// };
