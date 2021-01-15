/* eslint-disable max-classes-per-file */
import { DeSerializersType, getDeSerializers } from './de-serializers';

class EntityApi<StringDT = string, Int32DT = number> {
  protected deSerializers: DeSerializersType<StringDT, Int32DT>;
  constructor(
    customDeSerializers?: Partial<DeSerializersType<StringDT, Int32DT>>
  ) {
    this.deSerializers = getDeSerializers(customDeSerializers);
  }
}

export class TestEntityApi<
  StringDT = string,
  Int32DT = number
> extends EntityApi<StringDT, Int32DT> {
  stringProp: StringDT;
  intProp: Int32DT;

  deSerializers: DeSerializersType<StringDT, Int32DT>;
  constructor(
    customDeSerializers?: Partial<DeSerializersType<StringDT, Int32DT>>
  ) {
    super(customDeSerializers);
  }

  transform<NewStringDT = string, NewInt32DT = number>(
    deSerializers: Partial<DeSerializersType<NewStringDT, NewInt32DT>>
  ): TestEntityApi<NewStringDT, NewInt32DT> {
    return new TestEntityApi(deSerializers);
  }
}
