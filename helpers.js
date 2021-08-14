const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const toChannel = (member, ch) => member.voice.setChannel(ch);

module.exports = {
  sleep,
  toChannel
}