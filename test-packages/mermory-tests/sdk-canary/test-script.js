const memwatch = require('node-memwatch-new');
const { testService } = require('./test-service');

const dest = {url: 'http://localhost:4004/' };

const main = async () => {
  // The script is written in js (not ts) and executed with --inspect flag because of this lib.
  const hd = new memwatch.HeapDiff();

  const testEntityApi = testService().testEntityApi;
  const testEntities101 = await testEntityApi.requestBuilder().getAll().execute(dest);
  const testEntities102 = await testEntityApi.requestBuilder().getAll().execute(dest);
  const testEntities103 = await testEntityApi.requestBuilder().getAll().execute(dest);
  const testEntities104 = await testEntityApi.requestBuilder().getAll().execute(dest);
  const testEntities105 = await testEntityApi.requestBuilder().getAll().execute(dest);
  const testEntities106 = await testEntityApi.requestBuilder().getAll().execute(dest);
  const testEntities107 = await testEntityApi.requestBuilder().getAll().execute(dest);
  const testEntities108 = await testEntityApi.requestBuilder().getAll().execute(dest);
  const testEntities109 = await testEntityApi.requestBuilder().getAll().execute(dest);
  const testEntities110 = await testEntityApi.requestBuilder().getAll().execute(dest);

  const testEntity50ColApi = testService().testEntity50ColApi;
  const testEntities201 = await testEntity50ColApi.requestBuilder().getAll().execute(dest);
  const testEntities202 = await testEntity50ColApi.requestBuilder().getAll().execute(dest);
  const testEntities203 = await testEntity50ColApi.requestBuilder().getAll().execute(dest);
  const testEntities204 = await testEntity50ColApi.requestBuilder().getAll().execute(dest);
  const testEntities205 = await testEntity50ColApi.requestBuilder().getAll().execute(dest);
  const testEntities206 = await testEntity50ColApi.requestBuilder().getAll().execute(dest);
  const testEntities207 = await testEntity50ColApi.requestBuilder().getAll().execute(dest);
  const testEntities208 = await testEntity50ColApi.requestBuilder().getAll().execute(dest);
  const testEntities209 = await testEntity50ColApi.requestBuilder().getAll().execute(dest);
  const testEntities210 = await testEntity50ColApi.requestBuilder().getAll().execute(dest);

  const diff = hd.end();
  console.log(diff.change.size_bytes);
  // console.log("Additional heap memory  used: " + diff.change.size);
  // console.log("Major changes: " + JSON.stringify(diff.change.details.filter(e => e.size.includes('kb') || e.size.includes('mb'))));
};

main();
