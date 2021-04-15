const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.once('ready', () => {
  console.log('ready!');
});

client.on('message', (message) => {
  // console.log(message.content);
  if (message.content === '!ping') {
    message.channel.send('pong');
  }
});

client.login(process.env.TOKEN);
