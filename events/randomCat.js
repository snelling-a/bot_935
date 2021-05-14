const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'message',
  execute(message) {
    let regex = new RegExp('/(\s?)cats{0,1}\b/gmi');
    if (regex.test(message.content)) {
      console.log('🐱');
      const cat = async () => {
        const response = await fetch('https://aws.random.cat/meow');
        const data = await response.json();
        console.log('file: randomCat.js  line 13  cat   data', data);
        const randomCat = new Discord.MessageEmbed().setColor('#EEEEE9').setImage(data.file);
        await message.channel.send(randomCat);
      };
      cat();
    }
  },
};
