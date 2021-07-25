module.exports = {
  name: 'commands',
  description: '',
  execute(message) {
    const allCommands =
      '`!bcommand` - Exibe os comandos disponíveis\n`!consulta` - O Dr. Baseggio realiza um diagnóstico e prescreve um medicamento\n';
    message.channel.send(allCommands);
  },
};
