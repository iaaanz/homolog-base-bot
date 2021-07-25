module.exports = {
  name: 'commands',
  description: '',
  execute(message) {
    const allCommands =
      '`!!commands` - Exibe os comandos disponíveis\n`!!consulta` - O Dr. Baseggio realiza um diagnóstico e prescreve um medicamento\n`!!move @user` - Leva o amigão pra dar uma volta no server';
    message.channel.send(allCommands);
  },
};
