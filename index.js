const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const { prefix } = require('./config.json');

client.once('ready', () => {
  console.log('ready!');
});

client.on('message', (message) => {
  // console.log(message.content);
  if (message.content.startsWith(`${prefix}ping`)) {
    message.channel.send('pong');
  } else if (message.content.startsWith(`${prefix}beep`)) {
    message.channel.send('boop');
  } else if (message.content === `${prefix}server`) {
    message.channel.send(
      `this server's name is: ${message.guild.name}\ntotal members: ${message.guild.memberCount}`,
    );
  } else if (message.content === `${prefix}user-info`) {
    message.channel.send(
      `your username: ${message.author.username}\nyour id: ${message.author.id}`,
    );
  }
});

client.login(process.env.TOKEN);
