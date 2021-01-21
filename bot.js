var express = require('express');
var app = express();
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
var axios = require("axios");
const remedio = require('./data/remedios.json')
const doenca = require('./data/doencas.json')
const PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.send('Checked!');
  console.log('Checked!');
});

var opcQuote = {
  method: 'GET',
  url: 'https://bodybuilding-quotes.p.rapidapi.com/random-quote',
  headers: {
    //'x-api-key': '{{api-key}}',
    'x-rapidapi-key': process.env.rapidapi_key,
    'x-rapidapi-host': 'bodybuilding-quotes.p.rapidapi.com'
  }
};

function transRequest(msg) {
  axiosTest()
  .then(function (response) {
    console.log("\n##############################################################################################################\n> Mensagem em inglês: "+response)
    var opcTrans = {
      method: 'POST',
      url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
      params: {
        to: 'pt-br',
        'api-version': '3.0',
        from: 'en',
        profanityAction: 'NoAction',
        textType: 'plain'
      },
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': process.env.rapidapi_key,
        'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com'
      },
      data: [
        {
          Text: response
        }
      ],
    };
    console.log('> Requisição enviada para o tradutor')
    axios.request(opcTrans)
    .then(function (response) {
      console.log('> Mensagem em português: '+response.data[0].translations[0].text+'\n');
      msg.channel.send(response.data[0].translations[0].text)
    }).catch(function (error) {
      console.error(error);
    });
  }).catch(function (error) {
    console.error(error);
  });
}

function rangeGen(min, max) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

async function axiosTest() {
  const response = await axios.request(opcQuote)
  return response.data.quote
} 
  
function consulta(msg){
  var codRemedio = rangeGen(0, 25680)
  tarja = remedio[codRemedio].TARJA
  if (tarja == 'Tarja Preta'){
    msg.reply(' olá, você foi diagnositcado com '+doenca[rangeGen(0, 14232)].nome+', nessa situação vou te receitar '+remedio[codRemedio].SUBSTANCIA+' ('+remedio[codRemedio].APRESENTACAO+'), mas tome cuidado pois esse remédio é TARJA PRETA, se não tomado de maneira correta pode causar dependência!')
  } else if (tarja == 'Tarja Vermelha'){
    msg.reply(' olá, você foi diagnositcado com '+doenca[rangeGen(0, 14232)].nome+', nessa situação vou te receitar '+remedio[codRemedio].SUBSTANCIA+' ('+remedio[codRemedio].APRESENTACAO+'), siga as minhas prescrições pois esse remédio é TARJA VERMELHA!')
  } else {
    msg.reply(' olá, você foi diagnositcado com '+doenca[rangeGen(0, 14232)].nome+', nessa situação vou te receitar '+remedio[codRemedio].SUBSTANCIA+' ('+remedio[codRemedio].APRESENTACAO+')')
  }
}

function commandsMenu(msg){
  if (msg.content === '!bcommand') {
    msg.channel.send(allCommands)
    console.log('> Executado !bcommand')
  }  else if (msg.content === '!operacao') {
    msg.reply('__')
  } else if (msg.content === '!consulta') {
    console.log('> Executado !consulta')
    consulta(msg)
  } else if (msg.content === '!motivacao') {
    console.log('> Executado !motivacao')
    transRequest(msg);    
  } else if (msg.content === '!tt') {
    // consulta(msg)
  }
}

client.on('message', commandsMenu);

const allCommands = '`!bcommand` - Exibe os comandos disponíveis\n`!consulta` - O Dr. Baseggio realiza um diagnóstico e prescreve um medicamento\n`!oi` - Teste\n`!dica` - Teste\n`!motivacao` - Dr. Lucas recita uma belíssima frase motivacional\n`!suga` - Teste\n`!base` - Teste\n`!tt` - Teste\n'

client.login(process.env.bot_token);

app.listen(PORT, () => {

  console.log(`Running on port ${ PORT }`);

  client.on('ready',  () => {
    console.log(`${client.user.tag} está online :)`);
  });
  
  // client.on('message', commandsMenu);
});

