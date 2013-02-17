var app = require('express')();
require('./config/')(app);
require('./routes')(app);

var server = require('http').createServer(app);

server.listen(process.env.PORT || 3000, function(){
  console.log('server started');
});
