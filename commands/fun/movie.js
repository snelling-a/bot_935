const Discord = require('discord.js');
require('dotenv').config();
const fetch = require('node-fetch');

module.exports = {
  name: 'movie',
  description: 'look up a movie',
  usage: '<[movie name]>',
  execute(message, args) {
    /**
     * check for correct channel
     */
    if (!message.channel.name.includes('movies')) {
      console.log('wrong channel');
      message.channel.send('this command only works in the "movies" channel');
      return;
    }

    /**
     * check command input
     */
    if (!args.length) {
      message.channel.send('please tell me a movie to search for\nusage: !movie [movie name]');
    }

    /**
     * search for movie
     */
    const query = args.join('%20');
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

    const movie = async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log('file: movie.js  line 35  movie  data', data.results[0]);
      const { original_title, overview, backdrop_path, release_date } = data.results[0];
      const movie = new Discord.MessageEmbed()
        .setTitle(original_title)
        /**
         * format date
         */
        .addField('released:', release_date)
        .setDescription(overview)
        .setColor('#042941')
        .setImage(`https://image.tmdb.org/t/p/w500${backdrop_path}`)
        .setTimestamp();
      console.log('hopefully this is the right movie');
      await message.channel.send(movie);
    };

    movie();
  },
};
