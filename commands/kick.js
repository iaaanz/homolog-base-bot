module.exports = {
  name: 'kicktec',
  description: '',
  execute(client, message, args) {
    const member = message.guild.member('286648520252063744');
    member.voice.kick();
  },
};
