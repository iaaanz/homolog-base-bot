const channels = ['854506690972221490', '854506729797451777', '854506763486756884'];

const whiteList = ['385171042773106691', '275731807570362368'];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const toChannel = (member, ch) => member.voice.setChannel(ch);

const move = async (member, channelID, time, ms) => {
  for (let i = 0; i < time; i++) {
    for (let j = 0; j < channels.length; j++) {
      toChannel(member, channels[j]);
      await sleep(ms);
    }
  }
  toChannel(member, channelID);
};

const mapUser = (userObj, msg, userId, reply, imgPath) => {
  const id = userId.replace(/\D+/g, '');
  if (whiteList.includes(id)) return;

  userObj.members.map((member) => {
    if (member.user.id == id) {
      typeof imgPath === 'undefined'
        ? msg.channel.send(`${userId}, ${reply}`)
        : msg.channel.send(reply, imgPath);
      move(member, userObj.channelId, 3, 1000);
    }
  });
};

module.exports = {
  name: 'move',
  description: '',
  execute(message, args) {
    const content = message.content;
    const userObj = {
      members: message.channel.members,
      channelId: message.member.voice.channelID,
    };

    mapUser(userObj, message, args[0], 'desmuta corno');
  },
};
