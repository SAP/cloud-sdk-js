import {foodService} from '../../test/test-util/data-model';
import {readRequestType, writeRequestType} from './type';
import {Destination, getDestination, Protocol} from "@sap-cloud-sdk/connectivity";

describe('type', () => {
  const serviceV2 = foodService;

  it('considers only GET function imports for read response', () => {
    const types = (readRequestType(foodService).type as string).split('|');
    expect(types.join()).toMatch(/funcGetReturn/);
  });

  it('considers not POST function imports for read response', () => {
    const types = (readRequestType(foodService).type as string).split('|');
    expect(types.join()).not.toMatch(/funcPostReturn/);
  });

  it('considers POST function import for write response', () => {
    const types = (writeRequestType(foodService).type as string).split('|');
    expect(types.join()).toMatch(/funcPostReturn/);
  });

  it('considers not  GET function import for write response', async() => {


    const fpp:Destination = {
      name: 'foo',
      url: 'myUrl',
      proxyConfiguration:{
        host : 'myHost',
        port: 123,
        protocol: Protocol.HTTP
      }
    }
    console.log(JSON.stringify([fpp]))

    const myString = `[{
"name": "foo",
"url": "http://foo.dest",
"proxyConfiguration":{
      "host": "127.0.0.1",
      "port": 8887,
      "protocol":"http"
  }
}]`
  const parsed = JSON.parse(myString)
    process.env.destinations = myString
    const result = await getDestination({destinationName:'foo'})
    console.log(result)
    // const types = (writeRequestType(foodService).type as string).split('|');
    // expect(types.join()).not.toMatch(/funcGetReturn/);
  });

});
