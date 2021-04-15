module.exports = {
  name: 'user-info',
  description: 'get user info',
  execute(message, args) {
    message.channel.send(
      `${message.author.displayAvatarURL(true)}\nyour username: ${
        message.author.username
      }\nyour id: ${message.author.id}`,
    );
  },
};
