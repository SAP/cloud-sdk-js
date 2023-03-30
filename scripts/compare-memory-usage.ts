const threshold = 105;

const main = () => {
  const v2MemoryUsage = parseInt(process.argv[2]);
  const canaryMemoryUsage = parseInt(process.argv[3]);
  const percentageBasedOnv2 = (canaryMemoryUsage / v2MemoryUsage) * 100;
  if (percentageBasedOnv2 > threshold) {
    throw new Error(
      `Test failed: v2 memory usage is ${v2MemoryUsage} and canary memory usage is ${canaryMemoryUsage} (${percentageBasedOnv2} %). Consider changing the threshold (${threshold} %) or fix it.`
    );
  }
  /* eslint-disable-next-line no-console */
  console.log(
    `Test passed: v2 memory usage is ${v2MemoryUsage} and canary memory usage is ${canaryMemoryUsage} (${percentageBasedOnv2} %).`
  );
};

main();
