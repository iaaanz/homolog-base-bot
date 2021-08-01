module.exports = {
  name: 'kicktec',
  description: '',
  execute(message, args) {
    const member = message.guild.member('286648520252063744');
    // member.kick(); kicka do servidor, não usar
    member.voice.kick();
  },
};
