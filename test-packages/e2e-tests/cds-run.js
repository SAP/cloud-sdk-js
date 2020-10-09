/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require('child_process');

spawn('cds', ['run'], {
  stdio: ['inherit', 'inherit', 'inherit']
});
