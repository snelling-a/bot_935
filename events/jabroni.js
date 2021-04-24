const Discord = require('discord.js');
require('dotenv').config();
const fetch = require('node-fetch');

module.exports = {
  name: 'message',
  execute(message) {
    if (message.content.toLowerCase().includes('jabroni') || message.content.toLowerCase().includes('jabronis')) {
      const theRock = async () => {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=peoples%20elbow`,
        );
        const data = await response.json();
        const { images, title } = data.data;

        const jabroni = new Discord.MessageEmbed()
          .setTitle(title)
          .addFields(
            {
              name: `•••`,
              value: 'can you smell',
              inline: true,
            },
            {
              name: `•••`,
              value: 'what the rock',
              inline: true,
            },
            {
              name: `•••`,
              value: 'is cooking',
              inline: true,
            },
          )
          .setColor('#fc9403')
          .setImage(images.downsized_large.url)
          .setTimestamp();
        console.log('can you smell what the rock is cooking?');
        await message.channel.send(jabroni);
      };
      theRock();
    }
  },
};
