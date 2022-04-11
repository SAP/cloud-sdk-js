const { testService } = require('./test-service');
var memwatch = require('node-memwatch-new');

const interval = setInterval(() =>
  console.log(`HEAP used: ${Math.round(process.memoryUsage().heapUsed/1024/1024)} MB`), 1000);

const dest = {url: 'http://localhost:4004/' };

const sdkCode = async () => {
  const col = [];
  const api = testService().testEntity50ColApi;

  var hd0 = new memwatch.HeapDiff();
  for(let i=0;i<6000;i++) {
    col[i] = api.entityBuilder().keyTestEntity50Col(1);
  }
  var diff0 = hd0.end();
  console.log(diff0);
  console.log(col.length);
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
