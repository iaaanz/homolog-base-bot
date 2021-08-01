module.exports = {
  name: 'kicktec',
  description: '',
  execute(message, args) {
    const member = message.guild.member('COLOCAR O ID DO TEC');
    // member.kick(); kicka do servidor, não usar
    member.voice.kick();
  },
};
