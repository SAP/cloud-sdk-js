const threshold = 90;

const main = () => {
  const v1MemoryUsage = parseInt(process.argv[2]);
  const canaryMemoryUsage = parseInt(process.argv[3]);
  const percentageBasedOnV1 = (canaryMemoryUsage / v1MemoryUsage) * 100;
  if (percentageBasedOnV1 > threshold) {
    throw new Error(
      `Test failed: v1 memory usage is ${v1MemoryUsage} and canary memory usage is ${canaryMemoryUsage} (${percentageBasedOnV1} %). Consider changing the threshold (${threshold} %) or fix it.`
    );
  }
  /* eslint-disable-next-line no-console */
  console.log(
    `Test passed: v1 memory usage is ${v1MemoryUsage} and canary memory usage is ${canaryMemoryUsage} (${percentageBasedOnV1} %).`
  );
};

main();
