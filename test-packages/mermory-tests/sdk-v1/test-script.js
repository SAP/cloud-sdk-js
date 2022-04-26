const memwatch = require('node-memwatch-new');
const { writeFileSync } = require('fs');
const { resolve } = require('path');
const { TestEntity, TestEntity50Col } = require('./test-service');

const dest = {url: 'http://localhost:4004/' };

const test = async () => {
  // The script is written in js (not ts) and executed with --inspect flag because of this lib.
  const hd = new memwatch.HeapDiff();

  const testEntities101 = await TestEntity.requestBuilder().getAll().execute(dest);
  // const testEntities102 = await TestEntity.requestBuilder().getAll().execute(dest);
  // const testEntities103 = await TestEntity.requestBuilder().getAll().execute(dest);
  // const testEntities104 = await TestEntity.requestBuilder().getAll().execute(dest);
  // const testEntities105 = await TestEntity.requestBuilder().getAll().execute(dest);
  // const testEntities106 = await TestEntity.requestBuilder().getAll().execute(dest);
  // const testEntities107 = await TestEntity.requestBuilder().getAll().execute(dest);
  // const testEntities108 = await TestEntity.requestBuilder().getAll().execute(dest);
  // const testEntities109 = await TestEntity.requestBuilder().getAll().execute(dest);
  // const testEntities110 = await TestEntity.requestBuilder().getAll().execute(dest);
  //
  // const testEntities201 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  // const testEntities202 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  // const testEntities203 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  // const testEntities204 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  // const testEntities205 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  // const testEntities206 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  // const testEntities207 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  // const testEntities208 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  // const testEntities209 = await TestEntity50Col.requestBuilder().getAll().execute(dest);
  // const testEntities210 = await TestEntity50Col.requestBuilder().getAll().execute(dest);

  const diff = hd.end();
  console.log("Additional heap memory  used: " + diff.change.size);
  console.log("Major changes: " + JSON.stringify(diff.change.details.filter(e => e.size.includes('kb') || e.size.includes('mb'))));
  console.log(diff.change.size_bytes);
  return diff.change.size_bytes;
};

const main = async () => {
  const result = await test();
  writeFileSync(
    resolve(__dirname, './result.txt'),
    result,
    'utf8'
  );
}

main();
