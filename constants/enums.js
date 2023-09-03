const channelType = Object.freeze({
  voice: 0,
  text: 1,
});

const voiceSessionType = Object.freeze({
  join: 0,
  leave: 1,
});

module.exports = {
  channelType,
};
