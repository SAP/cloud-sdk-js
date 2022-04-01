import { testService } from './test-service';

const interval = setInterval(() =>
  console.log(`HEAP used: ${Math.round(process.memoryUsage().heapUsed/1024/1024)} MB`), 1000);

const dest = {url: 'http://localhost:4004/' };

const sdkCode = async () => {
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
  console.log(testEntities210.length);
};

async function main(){
  console.log('***** test starts *****');

  await sdkCode();

  setTimeout(() => {
    clearInterval(interval);
  }, 10000);

  console.log('***** test ends *****');
}

main();
