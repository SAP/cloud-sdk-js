const memwatch = require('node-memwatch-new');
const { writeFileSync } = require('fs');
const { resolve } = require('path');
const { testService } = require('./test-service');

const dest = { url: 'http://localhost:4004/' };

const test = async () => {
  // The script is written in js (not ts) and executed with --inspect flag because of this lib.
  const hd = new memwatch.HeapDiff();
  // It is intended to call execute multiple times without using a loop, so the deserializer, the entity builder and the schema will still be kept in the memory.
  const testEntityApi = testService().testEntityApi;
  const testEntities101 = await testEntityApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities102 = await testEntityApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities103 = await testEntityApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities104 = await testEntityApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities105 = await testEntityApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities106 = await testEntityApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities107 = await testEntityApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities108 = await testEntityApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities109 = await testEntityApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities110 = await testEntityApi
    .requestBuilder()
    .getAll()
    .execute(dest);

  const testEntity50PropApi = testService().testEntity50PropApi;
  const testEntities201 = await testEntity50PropApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities202 = await testEntity50PropApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities203 = await testEntity50PropApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities204 = await testEntity50PropApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities205 = await testEntity50PropApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities206 = await testEntity50PropApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities207 = await testEntity50PropApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities208 = await testEntity50PropApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities209 = await testEntity50PropApi
    .requestBuilder()
    .getAll()
    .execute(dest);
  const testEntities210 = await testEntity50PropApi
    .requestBuilder()
    .getAll()
    .execute(dest);

  const diff = hd.end();
  console.log('Additional heap memory  used: ' + diff.change.size);
  console.log(
    'Major changes: ' +
      JSON.stringify(
        diff.change.details.filter(
          e => e.size.includes('kb') || e.size.includes('mb')
        )
      )
  );
  console.log(diff.change.size_bytes);
  return diff.change.size_bytes.toString();
};

const main = async () => {
  const result = await test();
  writeFileSync(resolve(__dirname, './result.txt'), result, 'utf8');
};

main();
