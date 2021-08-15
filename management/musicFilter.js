const { sleep, getChannelTitle } = require("../helpers");

const bannedSongs = ['skylab', 'meu pau fica', 'da faculdade do', 'nas portas do'];

const musicBots = ['235088799074484224', '234395307759108106']

const filter = async (message) => {
  const groovyBot = message.guild.member('234395307759108106');
  const rythmBot = message.guild.member('235088799074484224');
  const botEmbeds = message.embeds[0];
  const msgContent = message.content.toLowerCase();
  const authorId = message.author.id.replace(/\D+/g, '');
  if (musicBots.includes(authorId)) {
    if (typeof botEmbeds != 'undefined') {
      const botDesc = botEmbeds.description.toLowerCase();
      await sleep(1000);
      return bannedSongs.some(key => botDesc.includes(key)) ? groovyBot.voice.kick() : '';
    }
    
    await sleep(1000);

    if (msgContent.startsWith('**')) {
      const searchWord = msgContent.match(/`([^`]+)`/)[1];
      const channelTitle = await getChannelTitle(searchWord);
      return bannedSongs.some(key => channelTitle.includes(key)) ? rythmBot.voice.kick() : '';
    }
    
    return bannedSongs.some(key => msgContent.includes(key)) ? rythmBot.voice.kick() : '';
  }
}

module.exports = {
  filter
};
