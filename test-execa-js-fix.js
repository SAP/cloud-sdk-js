module.exports = {
  // main is now async, which is a breaking change
  main: async () => {
    // move import into a module is the fix, but you have to dynamically import, making it async
    const { execa } = await import("execa");
    const ls = await execa('ls');
    console.log(ls);
  }
};

module.exports.main()
