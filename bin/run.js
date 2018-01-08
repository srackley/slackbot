'use strict';

const http = require('http');
const service = require('../server/service');

const server = http.createServer(service);
server.listen(3000);

server.on('listening', () => {
  console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode.`);
});
