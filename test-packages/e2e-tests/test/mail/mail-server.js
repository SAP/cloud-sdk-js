const { join, resolve } = require('path');
const { rmSync, readdirSync, mkdirSync, createWriteStream } = require('fs');
const { SMTPServer } = require('smtp-server');

const server = new SMTPServer({
  // [define authentication] hardcoded user password check
  onAuth(auth, session, callback) {
    if (auth.password !== 'pd') {
      return callback(new Error('Invalid username or password'));
    }
    callback(undefined, { user: auth.username }); // logon as a user
  },
  // [define sender verifications/logs] only logs
  onMailFrom(address, session, callback) {
    console.log('on mail from: ' + address.address);
    return callback(); // Accept the address
  },
  // [define data/message/mail handling] write a file or print to console
  onData(stream, session, callback) {
    stream.pipe(
      createWriteStream(
        join(
          resolve('test'),
          'mail',
          'test-output',
          `${session.user}-${session.id}-${session.transaction}.txt`
        )
      )
    );
    // stream.pipe(process.stdout); // print message to console
    stream.on('end', callback);
  }
});

server.on('error', err => {
  console.log('Error %s', err.message);
});

const testOutputDir = join(resolve('test'), 'mail', 'test-output');
mkdirSync(testOutputDir, { recursive: true });
readdirSync(testOutputDir).forEach(f => rmSync(`${testOutputDir}/${f}`));

server.listen(5566);
