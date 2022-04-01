import { TestEntity50Col } from './test-service';

const interval = setInterval(() =>
  console.log(`HEAP used: ${Math.round(process.memoryUsage().heapUsed/1024/1024)} MB`), 1000);

const dest = {url: 'http://localhost:4004/' };

const sdkCode = async () => {
  const col:any[] = [];
  for(let i=0;i<6000;i++) {
    col[i] = TestEntity50Col.builder().keyTestEntity50Col(1);
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
