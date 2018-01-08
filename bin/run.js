'use strict';

const slackClient = require('../server/slackClient');
const http = require('http');
const service = require('../server/service');

const server = http.createServer(service);

const slackToken = 'xoxb-294815327697-a4HU9vSWQohChNzbmy5Ywhj7';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', () => {
  console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode.`);
});
