import remedioJson from './data/remedios.json';
import doencaJson from './data/doencas.json';
import dotenv from 'dotenv';
import express from 'express';
import Discord from 'discord.js';
import axios from 'axios';
dotenv.config();
const app = express();
const client = new Discord.Client();
const PORT = process.env.PORT || 3000;
const allCommands =
  '`!bcommand` - Exibe os comandos disponíveis\n`!consulta` - O Dr. Baseggio realiza um diagnóstico e prescreve um medicamento\n';

app.get('/check', function (req, res) {
  res.send('Checked!');
  console.log('Checked!');
  reqVolta();
});

const reqVolta = () => {
  axios
    .get('https://ping-master-v1.herokuapp.com/check')
    .then(() => {
      console.log('Efetuando o request de volta :)');
    })
    .catch(function (error) {
      console.log(error);
    });
};

const menu = (msg) => {
  switch (msg.content) {
    case '!bcommand':
      msg.channel.send(allCommands);
      break;
    case '!consulta':
      consulta(msg);
      break;
  }
};

const rangeGen = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const consulta = (msg) => {
  const codRemedio = rangeGen(0, 25680);
  const doenca = doencaJson[rangeGen(0, 14232)].nome;
  const tarja = remedioJson[codRemedio].TARJA;
  switch (tarja) {
    case 'Tarja Preta':
      return msg.reply(
        `olá, você foi diagnositcado com ${doenca}, nessa situação vou te receitar ${remedioJson[codRemedio].SUBSTANCIA} (${remedioJson[codRemedio].APRESENTACAO}), mas tome cuidado pois esse remédio é TARJA PRETA, se não tomado de maneira correta pode causar dependência!`
      );
      break;
    case 'Tarja Vermelha':
      return msg.reply(
        `olá, você foi diagnositcado com ${doenca}, nessa situação vou te receitar ${remedioJson[codRemedio].SUBSTANCIA} (${remedioJson[codRemedio].APRESENTACAO}), siga as minhas prescrições pois esse remédio é TARJA VERMELHA!`
      );
      break;
    default:
      return msg.reply(
        `olá, você foi diagnositcado com ${doenca}, nessa situação vou te receitar ${remedioJson[codRemedio].SUBSTANCIA} (${remedioJson[codRemedio].APRESENTACAO})`
      );
      break;
  }
};

client.on('message', menu);
client.login(process.env.bot_token);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
  client.on('ready', () => {
    console.log(`${client.user.tag} está online :)`);
  });
});
