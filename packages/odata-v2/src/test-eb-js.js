const { TestSchema } = require('../dist/TestSchema');
const { TestProp } = require('../dist/TestProp');
const { TestNS} = require('../dist/TestNS');

const { testService, TestEntity } = require('@sap-cloud-sdk/test-services/v2/test-service');
var memwatch = require('node-memwatch-new');


const sdkCode = async () => {
  const api = testService().testEntityApi;
  const testSchema = new TestSchema();
  const testProp = new TestProp();
  const col = [];
  // const t = new TestEntity(testService().testEntityApi.schema);

  // var hd0 = new memwatch.HeapDiff();
  // for(let i=0;i<10000;i++) {
  //   col[i] = api.schema;
  //   // col[i] = testSchema.schema;
  //   // col[i] = TestNS;
  //   // col[i] = testProp.schema;
  // }
  // col[0].k0 = undefined;
  // col[1].KEY_PROPERTY_STRING = 'ss';
  // var diff0 = hd0.end();
  // console.log(diff0);

  var hd1 = new memwatch.HeapDiff();
  // entityBuilder => 12 * 1000 EdmTypeField + 24 * 1000 OrderableEdmTypeField
  for(let i=0;i<1000;i++) {
    col[i] = api.entityBuilder();
  }
  var diff1 = hd1.end();
  console.log(diff1);

  // var hd2 = new memwatch.HeapDiff();
  // // entityBuilder => 12 EdmTypeField + 24 OrderableEdmTypeField
  // //TODO fix testService singleton
  // //TODO fix testEntity50ColApi singleton
  // //TODO fix entityBuilder singleton
  // //TODO check deserializer, when creating entities => singleton
  // col[1000] = testService().testEntityApi.entityBuilder();
  // var diff2 = hd2.end();
  // console.log(diff2);

  // var hd3 = new memwatch.HeapDiff();
  // const api = testService().testEntityApi;
  // for(let i=0;i<1000;i++) {
  // //singleton can help here, which cannot be applied unfortunately
  //   col[i] = api.entityBuilderNew();
  // }
  // var diff3 = hd3.end();
  // console.log(diff3);
  // console.log(col.length);
};

async function main(){
  console.log('***** test starts *****');

  await sdkCode();

  console.log('***** test ends *****');
}

main();
