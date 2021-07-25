const remedioJson = require('../data/remedios.json');
const doencaJson = require('../data/doencas.json');
const rangeGen = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const codRemedio = rangeGen(0, 25680);
const doenca = doencaJson[rangeGen(0, 14232)].nome;
const tarja = remedioJson[codRemedio].TARJA;

module.exports = {
  name: 'consulta',
  description: '',
  execute(message) {
    switch (tarja) {
      case 'Tarja Preta':
        return message.reply(
          `olá, você foi diagnositcado com ${doenca}, nessa situação vou te receitar ${remedioJson[codRemedio].SUBSTANCIA} (${remedioJson[codRemedio].APRESENTACAO}), mas tome cuidado pois esse remédio é TARJA PRETA, se não tomado de maneira correta pode causar dependência!`
        );
        break;
      case 'Tarja Vermelha':
        return message.reply(
          `olá, você foi diagnositcado com ${doenca}, nessa situação vou te receitar ${remedioJson[codRemedio].SUBSTANCIA} (${remedioJson[codRemedio].APRESENTACAO}), siga as minhas prescrições pois esse remédio é TARJA VERMELHA!`
        );
        break;
      default:
        return message.reply(
          `olá, você foi diagnositcado com ${doenca}, nessa situação vou te receitar ${remedioJson[codRemedio].SUBSTANCIA} (${remedioJson[codRemedio].APRESENTACAO})`
        );
        break;
    }
  },
};
