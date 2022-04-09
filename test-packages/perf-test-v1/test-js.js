var memwatch = require('node-memwatch-new');
const { TestEntity, TestEntity50Col } = require('./test-service');

const interval = setInterval(() =>
  console.log(`HEAP used: ${Math.round(process.memoryUsage().heapUsed/1024/1024)} MB`), 1000);

const dest = {url: 'http://localhost:4004/' };

const sdkCode = async () => {
  var hd = new memwatch.HeapDiff();
  const testEntities101 = await TestEntity.requestBuilder().getAll().execute(dest);
  const testEntities102 = await TestEntity.requestBuilder().getAll().execute(dest);
  const testEntities103 = await TestEntity.requestBuilder().getAll().execute(dest);
  const testEntities104 = await TestEntity.requestBuilder().getAll().execute(dest);
  const testEntities105 = await TestEntity.requestBuilder().getAll().execute(dest);
  const testEntities106 = await TestEntity.requestBuilder().getAll().execute(dest);
  const testEntities107 = await TestEntity.requestBuilder().getAll().execute(dest);
  const testEntities108 = await TestEntity.requestBuilder().getAll().execute(dest);
  const testEntities109 = await TestEntity.requestBuilder().getAll().execute(dest);
  const testEntities110 = await TestEntity.requestBuilder().getAll().execute(dest);

  const testEntities201 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  const testEntities202 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  const testEntities203 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  const testEntities204 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  const testEntities205 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  const testEntities206 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  const testEntities207 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  const testEntities208 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  const testEntities209 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  const testEntities210 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  var diff = hd.end();
  // 12.17mb -> 182.96mb (188mb last time)
  console.log(diff);
  console.log(testEntities210.length);
};

async function main(){
  console.log('***** test starts *****');

  await sdkCode();

  // setTimeout(() => {
  //   clearInterval(interval);
  // }, 10000);

  console.log('***** test ends *****');
}

main();
