import {
  ConstructorOrField,
  FieldBuilder as FieldBuidlerCommon
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '..';

export class FieldBuilder<
  FieldOfT extends ConstructorOrField<any>,
  DeSerializersT extends DeSerializers
> extends FieldBuidlerCommon<FieldOfT, DeSerializersT> {}
