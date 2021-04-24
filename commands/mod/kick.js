module.exports = {
  name: 'kick',
  description: 'Tag a member and kick them.',
  guildOnly: true,
  permissions: 'ADMINISTRATOR',
  usage: '@[username]',
  execute(message) {
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to kick them!');
    }

    const taggedUser = message.mentions.users.first();

    message.channel.send(`You wanted to kick: ${taggedUser.username}`);

    if (taggedUser) {
      const theKicked = message.guild.members.cache.get(taggedUser.id);
      theKicked.kick();

      message.channel.send(`${taggedUser.username} has been kicked`);
    } else {
      message.channel.send(`you can not kick ${taggedUser.username}`);
    }
  },
};
