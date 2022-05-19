const { join, resolve } = require('path');
const fs = require('fs');
const { SMTPServer } = require('smtp-server')

const server = new SMTPServer({
  // [define authentication] hardcoded user password check
  onAuth(auth, session, callback) {
    if (auth.username !== "user" || auth.password !== "pd") {
      return callback(new Error("Invalid username or password"));
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
    fs.mkdirSync(join(resolve('test'), 'mail', 'test-output'), { recursive: true });
    stream.pipe(fs.createWriteStream(join(resolve('test'), 'mail', 'test-output', 'mail.txt')));
    // stream.pipe(process.stdout); // print message to console
    stream.on("end", callback);
  }
});

server.on("error", err => {
  console.log("Error %s", err.message);
});

server.listen(5566);
