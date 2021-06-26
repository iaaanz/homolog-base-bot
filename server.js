require('dotenv').config();
const express = require('express');
const app = express();
const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const remedio = require('./data/remedios.json');
const doenca = require('./data/doencas.json');
const PORT = process.env.PORT || 3000;
const allCommands =
  '`!bcommand` - Exibe os comandos disponíveis\n`!consulta` - O Dr. Baseggio realiza um diagnóstico e prescreve um medicamento\n`!pensativo` - Dr. Lucas solta uma belíssima frase';

app.get('/check', function (req, res) {
  res.send('Checked!');
  console.log('Checked!');
  reqVolta();
});

function reqVolta() {
  axios
    .get('https://ping-master-v1.herokuapp.com/check')
    .then((resp) => {
      console.log('Efetuando o request de volta :)');
    })
    .catch(function (error) {
      console.log(error);
    });
}

var opcQuote = {
  method: 'GET',
  url: 'https://bodybuilding-quotes.p.rapidapi.com/random-quote',
  headers: {
    'x-rapidapi-key': process.env.rapidapi_key,
    'x-rapidapi-host': 'bodybuilding-quotes.p.rapidapi.com',
  },
};

let rangeGen = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

async function axiosReq() {
  const response = await axios.request(opcQuote);
  return response.data.quote;
}

function consulta(msg) {
  var codRemedio = rangeGen(0, 25680);
  tarja = remedio[codRemedio].TARJA;
  if (tarja == 'Tarja Preta') {
    msg.reply(
      `olá, você foi diagnositcado com ${
        doenca[rangeGen(0, 14232)].nome
      }, nessa situação vou te receitar ${remedio[codRemedio].SUBSTANCIA} (${
        remedio[codRemedio].APRESENTACAO
      }), mas tome cuidado pois esse remédio é TARJA PRETA, se não tomado de maneira correta pode causar dependência!`
    );
  } else if (tarja == 'Tarja Vermelha') {
    msg.reply(
      `olá, você foi diagnositcado com ${
        doenca[rangeGen(0, 14232)].nome
      }, nessa situação vou te receitar ${remedio[codRemedio].SUBSTANCIA} (${
        remedio[codRemedio].APRESENTACAO
      }), siga as minhas prescrições pois esse remédio é TARJA VERMELHA!`
    );
  } else {
    msg.reply(
      `olá, você foi diagnositcado com ${
        doenca[rangeGen(0, 14232)].nome
      }, nessa situação vou te receitar ${remedio[codRemedio].SUBSTANCIA} (${
        remedio[codRemedio].APRESENTACAO
      })`
    );
  }
}

function commandsMenu(msg) {
  if (msg.content === '!bcommand') {
    msg.channel.send(allCommands);
    console.log('> Executado !bcommand');
  } else if (msg.content === '!operacao') {
    msg.reply('Comando ainda não está pronto :tools:');
  } else if (msg.content === '!consulta') {
    console.log('> Executado !consulta');
    consulta(msg);
  } else if (msg.content === '!pensativo') {
    console.log('> Executado !pensativo');
    msg.reply('Comando ainda não está pronto :tools:');
  }
}

client.on('message', commandsMenu);

client.login(process.env.bot_token);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
  client.on('ready', () => {
    console.log(`${client.user.tag} está online :)`);
  });
});
