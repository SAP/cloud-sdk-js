var process = require('child_process');
process.exec('cds run',function (err,stdout,stderr) {
  if (err) {
    console.log("\n"+stderr);
  } else {
    console.log(stdout);
  }
});
