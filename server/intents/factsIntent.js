'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, registry, cb) {
  if (intentData.intent[0].value
    !== 'facts') {
    return cb(new Error(`Expected facts intent, got ${intentData.intent[0].value}`));
  }
  if (!intentData.location) return cb(new Error('Missing location in facts intent.'));

  const location = intentData.location[0].value;

  const service = registry.get('facts');

  if (!service) return cb(false, 'No service available');

  request.get(`http://${service.ip}:${service.port}/service/${location}`, (err, res) => {
    if (err || res.statusCode !== 200 || !res.body.result) {
      console.log(err);

      return cb(false, `I had a problem finding out a fun fact about ${location}`);
    }
    return cb(false, `In ${location}, ${res.body.result}`);
  });
};
