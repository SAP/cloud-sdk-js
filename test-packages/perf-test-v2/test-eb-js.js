const { testService } = require('./test-service');

const interval = setInterval(() =>
  console.log(`HEAP used: ${Math.round(process.memoryUsage().heapUsed/1024/1024)} MB`), 1000);

const dest = {url: 'http://localhost:4004/' };

const sdkCode = async () => {
  const col = [];
  for(let i=0;i<6000;i++) {
    col[i] = testService().testEntity50ColApi.entityBuilder().keyTestEntity50Col(1);
  }
  console.log(col.length);
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
