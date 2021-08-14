const { MessageEmbed } = require('discord.js');
const { logChannelId } = require('./ids');

const showLog = (client, message) => {
  const logChannel = client.channels.cache.get(logChannelId);
  const userId = message.author.id;
  const embed = new MessageEmbed()
    .setTitle('**Comando executado**')
    .setDescription(message.content)
    .setColor(0x3aff5e)    
    .addField("Usuario", `${message.author.username}#${message.author.discriminator}`)
    .addField("ID", userId)
  logChannel.send(embed);
  }

module.exports = {
  showLog,
};