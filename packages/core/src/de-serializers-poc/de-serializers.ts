type DeserializerType<ST, DT> = (val: ST) => DT;
type SerializerType<ST, DT> = (val: DT) => ST;
interface DeSerializerType<ST, DT> {
  serialize: SerializerType<ST, DT>;
  deserialize: DeserializerType<ST, DT>;
}

export interface DeSerializersType<StringDT, IntDT> {
  'Edm.String': DeSerializerType<string, StringDT>;
  'Edm.Int32': DeSerializerType<string, IntDT>;
}

const defaultStringDeSerializer: DeSerializerType<string, string> = {
  serialize: (val: string) => val,
  deserialize: (val: string) => val
};
const defaultIntDeSerializer: DeSerializerType<string, number> = {
  serialize: (val: number) => val.toString(),
  deserialize: (val: string) => parseInt(val.toString())
};

export const defaultDeSerializers = {
  'Edm.String': defaultStringDeSerializer,
  'Edm.Int32': defaultIntDeSerializer
};
export function getDeSerializers<StringDT = string, Int32DT = number>(
  deSerializers: Partial<DeSerializersType<StringDT, Int32DT>> | undefined
): DeSerializersType<StringDT, Int32DT> {
  return {
    ...(defaultDeSerializers as any),
    ...(deSerializers || {})
  };
}
