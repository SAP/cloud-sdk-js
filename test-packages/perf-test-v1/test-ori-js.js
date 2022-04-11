var memwatch = require('node-memwatch-new');
const { TestEntity100Col, TestEntity50Col } = require('./test-service');
const { or } = require('@sap-cloud-sdk/core')

const dest = {url: 'http://localhost:4004/' };

const sdkCode = async () => {
  const tasks = [];
  var hd = new memwatch.HeapDiff();
  // 2000 loop
  const loop = 100;
  for(let i = 0; i < loop; i++) {
    tasks.push(fetch());
  }
  const allData = [].concat(...await(Promise.all(tasks)));
  var diff = hd.end();
  console.log(diff);
  // 1 loop: 19.63 MB
  // 10 loop: 193.51 MB
  // 100 loop: 1719.16 MB
};

async function fetch(){
  const materials = await TestEntity100Col.requestBuilder().getAll().filter(TestEntity100Col.STRING_PROPERTY_1.equals('Emily Brontë')).skip(1).top(30).execute(dest);
  const items = await TestEntity50Col.requestBuilder().getAll().filter(TestEntity100Col.STRING_PROPERTY_1.equals('Emily Brontë'), or(...materials.map(m => TestEntity50Col.STRING_PROPERTY_1.equals(m.stringProperty1)))).execute(dest);
  return materials.map(m => {
    return {
      strProp: m.stringProperty1,
      numProp: m.doubleProperty1,
      //items: items.filter(i => i.stringProperty1 = m.stringProperty1)
      items: items[0]
      // 10 loop: 31.65 mb
      // 100 loop: 307.57 mb
      // 200 loop: 614.94 mb
    }
  });
}

async function main(){
  console.log('***** test starts *****');

  await sdkCode();

  console.log('***** test ends *****');
}

main();
