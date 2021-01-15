/* eslint-disable no-unused-expressions */
import { TestEntityApi } from './entity';

const customIntDeSerializer = {
  serialize: (val: string) => val,
  deserialize: (val: string) => val
};

const customDeSerializers = {
  'Edm.Int32': customIntDeSerializer
};

const x = new TestEntityApi();
x.stringProp;
x.intProp;

const y = new TestEntityApi(customDeSerializers);

y.stringProp;
y.intProp;

const z = x.transform(customDeSerializers);
z.stringProp;
z.intProp;
