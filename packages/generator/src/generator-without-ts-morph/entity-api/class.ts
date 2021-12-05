import { codeBlock, unixEOL } from '@sap-cloud-sdk/util';
import { VdmEntity } from '../../vdm-types';
import { getSchema } from './schema';

export function classContent(entity: VdmEntity) {
  return codeBlock`export class ${entity.className}Api<${getGenericTypesWithDefault()}> implements 
    EntityApi<
      ${entity.className}<
        DeSerializers<${getGenericTypes()}>
      >
    >, 
    DeSerializers<${getGenericTypes()}> {
  public deSerializers: DeSerializers<${getGenericTypes()}>;
  public schema;

  constructor(
    deSerializers: Partial<DeSerializers<${getGenericTypes()}>> = defaultDeSerializers as any){
      this.deSerializers = mergeDefaultDeSerializersWith(deSerializers);
      const fieldBuilder = new FieldBuilder(${entity.className}, this.deSerializers);
      this.schema = 
        ${getSchema(entity)}
      ;
    }
  
  entityConstructor = ${entity.className};
  
  requestBuilder(): ${entity.className}RequestBuilder<
    DeSerializers<${getGenericTypes()}>
  > {
    return new ${entity.className}RequestBuilder(this);
  }
  
  entityBuilder(): EntityBuilderType<
    ${entity.className}<
      DeSerializers<${getGenericTypes()}>
    >
  > {
    return entityBuilder(this);
  }
}`;
}

function getGenericTypesWithDefault(): string{
  return genericTypeAndDefault.map(typeAndDefault => `${typeAndDefault[0]} = ${typeAndDefault[1]}`).join(`,${unixEOL}`)
}
function getGenericTypes(): string{
  return genericTypeAndDefault.map(typeAndDefault => typeAndDefault[0]).join(`,${unixEOL}`);
}

const genericTypeAndDefault: string[][] = [['BinaryT', 'string'],
  ['BooleanT', 'boolean'],
  ['ByteT', 'number'],
  ['DecimalT', 'BigNumber'],
  ['DoubleT', 'number'],
  ['FloatT', 'number'],
  ['Int16T', 'number'],
  ['Int32T', 'number'],
  ['Int64T', 'BigNumber'],
  ['GuidT', 'string'],
  ['SByteT', 'number'],
  ['SingleT', 'number'],
  ['StringT', 'string'],
  ['AnyT', 'any'],
  ['DateTimeT', 'moment.Moment'],
  ['DateTimeOffsetT', 'moment.Moment'],
  ['TimeT', 'Time']
];

// export class TestEntityApi<
//   BinaryT = string,
//   BooleanT = boolean,
//   ByteT = number,
//   DecimalT = BigNumber,
//   DoubleT = number,
//   FloatT = number,
//   Int16T = number,
//   Int32T = number,
//   Int64T = BigNumber,
//   GuidT = string,
//   SByteT = number,
//   SingleT = number,
//   StringT = string,
//   AnyT = any,
//   DateTimeT = moment.Moment,
//   DateTimeOffsetT = moment.Moment,
//   TimeT = Time
//   > implements
//   EntityApi<
//     TestEntity<
//       DeSerializers<
//         BinaryT,
//         BooleanT,
//         ByteT,
//         DecimalT,
//         DoubleT,
//         FloatT,
//         Int16T,
//         Int32T,
//         Int64T,
//         GuidT,
//         SByteT,
//         SingleT,
//         StringT,
//         AnyT,
//         DateTimeT,
//         DateTimeOffsetT,
//         TimeT
//         >
//       >,
//     DeSerializers<
//       BinaryT,
//       BooleanT,
//       ByteT,
//       DecimalT,
//       DoubleT,
//       FloatT,
//       Int16T,
//       Int32T,
//       Int64T,
//       GuidT,
//       SByteT,
//       SingleT,
//       StringT,
//       AnyT,
//       DateTimeT,
//       DateTimeOffsetT,
//       TimeT
//       >
//     >
// {
//   public deSerializers: DeSerializers<
//     BinaryT,
//     BooleanT,
//     ByteT,
//     DecimalT,
//     DoubleT,
//     FloatT,
//     Int16T,
//     Int32T,
//     Int64T,
//     GuidT,
//     SByteT,
//     SingleT,
//     StringT,
//     AnyT,
//     DateTimeT,
//     DateTimeOffsetT,
//     TimeT
//     >;
//   public schema;
//
//   constructor(
//     deSerializers: Partial<
//       DeSerializers<
//         BinaryT,
//         BooleanT,
//         ByteT,
//         DecimalT,
//         DoubleT,
//         FloatT,
//         Int16T,
//         Int32T,
//         Int64T,
//         GuidT,
//         SByteT,
//         SingleT,
//         StringT,
//         AnyT,
//         DateTimeT,
//         DateTimeOffsetT,
//         TimeT
//         >
//       > = defaultDeSerializers as any
//   ) {
//     this.deSerializers = mergeDefaultDeSerializersWith(deSerializers);
//     const fieldBuilder = new NewFieldBuilder(TestEntity, this.deSerializers);
//
//     this.schema = {
//       /**
//        * Static representation of the [[keyPropertyGuid]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       KEY_PROPERTY_GUID: fieldBuilder.buildEdmTypeField(
//         'KeyPropertyGuid',
//         'Edm.Guid',
//         false
//       ),
//       /**
//        * Static representation of the [[keyPropertyString]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       KEY_PROPERTY_STRING: fieldBuilder.buildEdmTypeField(
//         'KeyPropertyString',
//         'Edm.String',
//         false
//       ),
//       /**
//        * Static representation of the [[stringProperty]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       STRING_PROPERTY: fieldBuilder.buildEdmTypeField(
//         'StringProperty',
//         'Edm.String',
//         true
//       ),
//       /**
//        * Static representation of the [[booleanProperty]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       BOOLEAN_PROPERTY: fieldBuilder.buildEdmTypeField(
//         'BooleanProperty',
//         'Edm.Boolean',
//         true
//       ),
//       /**
//        * Static representation of the [[guidProperty]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       GUID_PROPERTY: fieldBuilder.buildEdmTypeField(
//         'GuidProperty',
//         'Edm.Guid',
//         true
//       ),
//       /**
//        * Static representation of the [[int16Property]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       INT_16_PROPERTY: fieldBuilder.buildEdmTypeField(
//         'Int16Property',
//         'Edm.Int16',
//         true
//       ),
//       /**
//        * Static representation of the [[int32Property]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       INT_32_PROPERTY: fieldBuilder.buildEdmTypeField(
//         'Int32Property',
//         'Edm.Int32',
//         true
//       ),
//       /**
//        * Static representation of the [[int64Property]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       INT_64_PROPERTY: fieldBuilder.buildEdmTypeField(
//         'Int64Property',
//         'Edm.Int64',
//         true
//       ),
//       /**
//        * Static representation of the [[decimalProperty]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       DECIMAL_PROPERTY: fieldBuilder.buildEdmTypeField(
//         'DecimalProperty',
//         'Edm.Decimal',
//         true
//       ),
//       /**
//        * Static representation of the [[singleProperty]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       SINGLE_PROPERTY: fieldBuilder.buildEdmTypeField(
//         'SingleProperty',
//         'Edm.Single',
//         true
//       ),
//       /**
//        * Static representation of the [[doubleProperty]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       DOUBLE_PROPERTY: fieldBuilder.buildEdmTypeField(
//         'DoubleProperty',
//         'Edm.Double',
//         true
//       ),
//       /**
//        * Static representation of the [[floatProperty]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       FLOAT_PROPERTY: fieldBuilder.buildEdmTypeField(
//         'FloatProperty',
//         'Edm.Float',
//         true
//       ),
//       /**
//        * Static representation of the [[timeProperty]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       TIME_PROPERTY: fieldBuilder.buildEdmTypeField(
//         'TimeProperty',
//         'Edm.Time',
//         true
//       ),
//       /**
//        * Static representation of the [[dateTimeProperty]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       DATE_TIME_PROPERTY: fieldBuilder.buildEdmTypeField(
//         'DateTimeProperty',
//         'Edm.DateTime',
//         true
//       ),
//       /**
//        * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       DATE_TIME_OFF_SET_PROPERTY: fieldBuilder.buildEdmTypeField(
//         'DateTimeOffSetProperty',
//         'Edm.DateTimeOffset',
//         true
//       ),
//       /**
//        * Static representation of the [[byteProperty]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       BYTE_PROPERTY: fieldBuilder.buildEdmTypeField(
//         'ByteProperty',
//         'Edm.Byte',
//         true
//       ),
//       /**
//        * Static representation of the [[sByteProperty]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       S_BYTE_PROPERTY: fieldBuilder.buildEdmTypeField(
//         'SByteProperty',
//         'Edm.SByte',
//         true
//       ),
//       /**
//        * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       SOMETHING_THE_SDK_DOES_NOT_SUPPORT: fieldBuilder.buildEdmTypeField(
//         'SomethingTheSDKDoesNotSupport',
//         'Edm.Any',
//         true
//       ),
//       /**
//        * Static representation of the [[complexTypeProperty]] property for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       COMPLEX_TYPE_PROPERTY: fieldBuilder.buildComplexTypeField(
//         'ComplexTypeProperty',
//         TestComplexTypeField,
//         true
//       ),
//       /**
//        * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
//        * Use to reference this property in query operations such as 'select' in the fluent request API.
//        */
//       TO_MULTI_LINK: new Link(
//         'to_MultiLink',
//         TestEntity,
//         TestEntityMultiLink
//       ) as Link<TestEntity, TestEntityMultiLink>,
//       // /**
//       //  * Static representation of the one-to-many navigation property [[toOtherMultiLink]] for query construction.
//       //  * Use to reference this property in query operations such as 'select' in the fluent request API.
//       //  */
//       // TO_OTHER_MULTI_LINK: new Link(
//       //   'to_OtherMultiLink',
//       //   TestEntity,
//       //   TestEntityOtherMultiLink
//       // ) as Link<TestEntity, TestEntityOtherMultiLink>,
//       // /**
//       //  * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
//       //  * Use to reference this property in query operations such as 'select' in the fluent request API.
//       //  */
//       // TO_SINGLE_LINK: new OneToOneLink(
//       //   'to_SingleLink',
//       //   TestEntity,
//       //   TestEntitySingleLink
//       // ) as OneToOneLink<TestEntity, TestEntitySingleLink>
//
//       /**
//        * All fields selector.
//        */
//       ALL_FIELDS: new AllFields('*', TestEntity) as AllFields<TestEntity>
//       // /**
//       //  * All key fields of the TestEntity entity.
//       //  */
//       // _keyFields: [
//       //   TestEntity.KEY_PROPERTY_GUID,
//       //   TestEntity.KEY_PROPERTY_STRING
//       // ] as Array<Field<TestEntity, boolean, boolean>>,
//       // /**
//       //  * Mapping of all key field names to the respective static field property TestEntity.
//       //  */
//       // _keys: TestEntity._keyFields.reduce(
//       //   (
//       //     acc: { [keys: string]: Field<TestEntity, boolean, boolean> },
//       //     field: Field<TestEntity, boolean, boolean>
//       //   ) => {
//       //     acc[field._fieldName] = field;
//       //     return acc;
//       //   },
//       //   {}
//       // ) as { [keys: string]: Field<TestEntity, boolean, boolean> }
//     };
//   }
//
//   entityConstructor = TestEntity;
//
//   requestBuilder(): TestEntityRequestBuilder<
//     DeSerializers<
//       BinaryT,
//       BooleanT,
//       ByteT,
//       DecimalT,
//       DoubleT,
//       FloatT,
//       Int16T,
//       Int32T,
//       Int64T,
//       GuidT,
//       SByteT,
//       SingleT,
//       StringT,
//       AnyT,
//       DateTimeT,
//       DateTimeOffsetT,
//       TimeT
//       >
//     > {
//     return new TestEntityRequestBuilder(this);
//   }
//
//   entityBuilder(): EntityBuilderType<
//     TestEntity<
//       DeSerializers<
//         BinaryT,
//         BooleanT,
//         ByteT,
//         DecimalT,
//         DoubleT,
//         FloatT,
//         Int16T,
//         Int32T,
//         Int64T,
//         GuidT,
//         SByteT,
//         SingleT,
//         StringT,
//         AnyT,
//         DateTimeT,
//         DateTimeOffsetT,
//         TimeT
//         >
//       >
//     > {
//     return entityBuilder(this);
//   }
