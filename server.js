require('dotenv').config();
const express = require('express');
const Discord = require('discord.js');
const axios = require('axios');
const { prefix } = require('./config.json');
const fs = require('fs');
const app = express();
const client = new Discord.Client();
const PORT = process.env.PORT || 3000;
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
const logChannel = require('./management/showLog');
const musicCommands = require('./management/musicFilter');

client.commands = new Discord.Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

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

client.on('message', (message) => {
  musicCommands.filter(message);

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  logChannel.showLog(client, message);

  try {
    client.commands.get(command).execute(client, message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

client.login(process.env.bot_token);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
  client.on('ready', () => {
    console.log(`${client.user.tag} está online :)`);
  });
});