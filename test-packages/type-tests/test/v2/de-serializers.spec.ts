import { mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v2/internal';

const customDeSerializers = {
  'Edm.String': {
    serialize: (val: number) => (val === 3 ? '3' : 'not 3'),
    deserialize: (val: any) => (val?.slice?.(0, 3) === 'not' ? 0 : 3)
  }
};

// $ExpectType DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, number, any, moment.Moment, moment.Moment, Time>
mergeDefaultDeSerializersWith(customDeSerializers);
