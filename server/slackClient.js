'use strict';

const { RtmClient } = require('@slack/client');
const { CLIENT_EVENTS } = require('@slack/client');
const { RTM_EVENTS } = require('@slack/client');

let rtm = null;

function handleOnAuthenticated(rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function handleOnMessage(message) {
  console.log(message);
  rtm.sendMessage('test', message.channel, () => {

  });
}

function addAuthenticatedHandler(rtm, handler) {
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module.exports.init = function slackClient(token, logLevel) {
  rtm = new RtmClient(token, { logLevel });
  addAuthenticatedHandler(rtm, handleOnAuthenticated);
  rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
  return rtm;
};

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;
