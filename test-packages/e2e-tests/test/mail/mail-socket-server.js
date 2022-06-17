const  WebSocketServer =  require('ws');

// TODO: use the example below for authentication
// https://github.com/websockets/ws/blob/982b7826f940b7caec5dd7ea82386dc531c5fdd4/examples/express-session-parse/index.js

const wss = new WebSocketServer.Server({
  host: 'localhost',
  port: 5577
});

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  // ws.send('something');
});


