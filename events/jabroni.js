const Discord = require('discord.js');
require('dotenv').config();
const fetch = require('node-fetch');

module.exports = {
  name: 'message',
  execute(message) {
    if (
      message.content.includes('jabroni') ||
      message.content.includes('jabronis')
    ) {
      const theRock = async () => {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=peoples elbow`,
        );
        const data = await response.json();
        console.log(data.data);
        const { images, url, title } = data.data;

        const jabroni = new Discord.MessageEmbed()
          .setTitle(title)
          .setColor('#fc9403')
          .setImage(images.downsized_large.url);
        console.log('can you smell what the rock is cooking?');
        await message.channel.send(jabroni);
      };
      theRock();
    }
  },
};
