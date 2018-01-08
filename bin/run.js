'use strict';

const { slackToken, witToken } = require('../secrets');

const slackClient = require('../server/slackClient');
const http = require('http');
const service = require('../server/service');

const server = http.createServer(service);

const witClient = require('../server/witClient')(witToken);

const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', () => {
  console.log(`BOT is listening on ${server.address().port} in ${service.get('env')} mode.`);
});
