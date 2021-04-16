const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
  name: 'message',
  execute(message) {
    if (message.content.includes('jabroni')) {
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=therock&limit=1&offset=25&lang=en`;

      const theRock = async () => {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
      };
      // const jabroni = new Discord.MessageEmbed()
      //   .setColor('#fc9403')
      //   .setImage(theRock);
      console.log('can you smell what the rock is cooking?');
      theRock();
      // return message.reply(jabroni);
    }
  },
};
