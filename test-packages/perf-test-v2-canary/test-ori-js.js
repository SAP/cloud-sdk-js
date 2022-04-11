var memwatch = require('node-memwatch-new');
const { testService } = require('./test-service');
const { or } = require('@sap-cloud-sdk/odata-v4')

const dest = {url: 'http://localhost:4004/' };
const testEntity50Api = testService().testEntity50ColApi;
const testEntity100Api = testService().testEntity100ColApi;
const schema50 = testEntity50Api.schema;
const schema100 = testEntity100Api.schema;

const sdkCode = async () => {
  const tasks = [];
  var hd = new memwatch.HeapDiff();
  // 2000 loop
  const loop = 10;
  for(let i = 0; i < loop; i++) {
    tasks.push(fetch());
  }
  const allData = [].concat(...await(Promise.all(tasks)));
  var diff = hd.end();
  console.log(JSON.stringify(diff.change.details.filter(e => e.size.includes('mb'))));
  // 1 loop: 17 MB
  // 10 loop: 168 MB
  // 100 loop: 1657 MB
};

async function fetch(){
  const materials = await testEntity100Api.requestBuilder().getAll().filter(schema100.STRING_PROPERTY_1.equals('Emily Brontë')).skip(1).top(30).execute(dest);
  const items = await testEntity50Api.requestBuilder().getAll().filter(schema100.STRING_PROPERTY_1.equals('Emily Brontë'), or(...materials.map(m => schema50.STRING_PROPERTY_1.equals(m.stringProperty1)))).execute(dest);
  return materials.map(m => {
    return {
      strProp: m.stringProperty1,
      numProp: m.doubleProperty1,
      //items: items.filter(i => i.stringProperty1 = m.stringProperty1)
      items: items[0]
      // 10 loop: 31.69 mb
      // 100 loop: 301 mb
    }
  });
}

async function main(){
  console.log('***** test starts *****');

  await sdkCode();

  console.log('***** test ends *****');
}

main();
