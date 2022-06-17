import fs from 'fs';
import { join, resolve } from 'path';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import WebSocket from 'ws';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';
import net from "net";

describe('Mail', () => {
  it('should send a mail', async () => {
    await sendTestMail();
    const mails = fs.readdirSync(join(resolve('test'), 'mail', 'test-output', 'http-server'));
    expect(
      mails.some(mail => {
        const mailDetails = fs.readFileSync(
          join(resolve('test'), 'mail', 'test-output', 'http-server', mail),
          { encoding: 'utf8' }
        );
        return (
          mailDetails.includes('To: TO1@example.com, TO2@example.com') &&
          mailDetails.includes('Subject: SUBJECT') &&
          mailDetails.includes('TEXT')
        );
      })
    ).toBe(true);
  });

  it('test', async ()=> {
    const endpoint = 'ws://localhost:5577';
    const socket = new WebSocket(endpoint);
    // TODO: When using http proxy, use the code below
    // Assumption: with http proxy, the proxy auth is the same as on-prem odata request
    // Therefore, we add the same "Proxy-Authorization" header with the jwt as the value
    // const httpsProxyAgent = new HttpsProxyAgent({
    //   host: 'localhost',
    //   port: 5566,
    //   protocol: 'http',
    //   rejectUnauthorized: false
    // });
    // const socket = new WebSocket(endpoint, { agent: httpsProxyAgent });
    // TODO: socket proxy
    // auth example reference: https://github.com/TooTallNate/node-socks-proxy-agent/issues/35
    // const agent = new SocksProxyAgent(`socks5://${user}:${pass}@${host}:${port}/`)

    socket.on('open', function () {
      console.log('"open" event!');
      // have to use socket.send and cannot use node.mailer
      socket.send('hello world');
    });

    socket.on('message', function (data, flags) {
      console.log('"message" event! %j %j', data, flags);
      socket.close();
    });
  });
});

async function sendTestMail(connection?: net.Socket): Promise<SMTPTransport.SentMessageInfo> {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    connection,
    host: 'localhost',
    port: 5566,
    // true for 465, false for other ports
    secure: false,
    auth: {
      user: 'user',
      pass: 'pd'
    },
    tls: {
      // disable tls config to fix the self signed certificate error
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  return transporter.sendMail({
    from: '"FROM" <from@example.com>', // sender address
    to: 'TO1@example.com, TO2@example.com', // list of receivers
    subject: 'SUBJECT',
    text: 'TEXT'
  });
}

// challenge
//
//
// 1. sending mail
//   [colleague tested] [our PoC] SMTP protocol => node-mailer
//   [blocked] socket protocol => WS WebSocket
//     auth ('auth' header) + email properties (from/to...) cannot config
//
// 2. on prem
// 2.1 http proxy (later)
//   [assume working] 'proxy-auth' header
//   [not tested][complicated implementation]
//   https://github.com/TooTallNate/node-http-proxy-agent/blob/master/src/agent.ts#L83
// 2.2 socket proxy (now)
//   [colleagues tested] '0x08' OAuth with JWT
//
// 3. using proxy config from env
// 3.1 basic auth
//   http://user@pd:proxy-host:1234
// 3.2 oauth
//    no ideas
