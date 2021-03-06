const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
require('dotenv').config();

const client = new Discord.Client();

const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}
/*
client.once('ready', () => {
  console.log('ready!');
});
 */

client.on('message', (message) => {
  /**
   * check if bot needs to respond
   */
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  /**
   * get command/args
   */
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLocaleLowerCase();

  const command =
    client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  /**
   * check if command is valid
   */
  if (!command) return;

  /**
   * check if command is for dms
   */
  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply("i can't execute that command inside DMs!");
  }

  /**
   * check permissions
   */
  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      // return message.reply('http://gph.is/1nFH9lL');

      const newman = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('nice try')
        .setImage('https://media.giphy.com/media/wSSooF0fJM97W/giphy.gif')
        .setFooter('maybe next time')
        .setTimestamp();
      return message.reply(newman);
    }
  }

  /**
   * check for arguments
   */
  if (command.args && !args.length) {
    let reply = `you didn't provide any arguments, ${message.author}`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  /**
   * check for cooldowns
   */
  const { cooldowns } = client;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`,
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  /**
   * execute command
   */
  try {
    command.execute(message, args);
  } catch (err) {
    console.log(err);
    message.reply('there was an error trying to execute that command');
  }
});

client.login(process.env.TOKEN || token);
