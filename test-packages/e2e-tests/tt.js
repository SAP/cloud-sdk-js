const interval = setInterval(() =>
  console.log(`HEAP used: ${Math.round(process.memoryUsage().heapUsed/1024/1024)} MB`), 1000);

async function main(){
  setTimeout(() => {
    clearInterval(interval);
  }, 10000);
}

main()
