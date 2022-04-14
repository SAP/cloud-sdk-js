const threshold = 0.9;

const main = () => {
  const v1MemoryUsage = parseInt(process.argv[2]);
  const canaryMemoryUsage = parseInt(process.argv[3]);
  if(v1MemoryUsage * threshold < canaryMemoryUsage) {
    throw new Error(`Test failed: v1 memory usage is ${v1MemoryUsage} but canary memory usage is ${canaryMemoryUsage}. Consider change the threshold or fix it.`);
  }
}

main()
