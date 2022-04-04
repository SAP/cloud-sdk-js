const { testService } = require('./test-service');
var memwatch = require('node-memwatch-new');

const interval = setInterval(() =>
  console.log(`HEAP used: ${Math.round(process.memoryUsage().heapUsed/1024/1024)} MB`), 1000);

const dest = {url: 'http://localhost:4004/' };

const sdkCode = async () => {
  const col = [];
  // var hd1 = new memwatch.HeapDiff();
  // for(let i=0;i<6000;i++) {
  //   col[i] = testService().testEntity50ColApi.entityBuilder().keyTestEntity50Col(1);
  // }
  // var diff1 = hd1.end();
  var hd2 = new memwatch.HeapDiff();
  // entityBuilder => 15 EdmTypeField + 36 OrderableEdmTypeField
  col[6000] = testService().testEntity50ColApi.entityBuilder().keyTestEntity50Col(1);
  var diff2 = hd2.end();
  // console.log(diff1);
  console.log(diff2);
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
