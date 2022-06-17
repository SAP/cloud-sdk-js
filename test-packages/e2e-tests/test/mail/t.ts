const  WebSocketServer =  require('ws');

const wss = new WebSocketServer.Server({
  host: 'localhost',
  port: 5577
});

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});
