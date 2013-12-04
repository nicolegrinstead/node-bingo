var socketClient = require('socket.io-client');

var client = socketClient.connect('ws://yahoobingo.herokuapp.com');

var payload = { name: 'Nicole Grinstead',
  email: 'nicolergrinstead@gmail.com',
  url: 'https://github.com/mridgway/bingo' };