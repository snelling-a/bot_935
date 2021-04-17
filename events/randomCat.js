const fetch = require('node-fetch');

module.exports = {
  name: 'cat',
  execute(message) {
    console.log(
      `cat ${message.author.tag} in #${message.channel.name} sent: ${message.content}`,
    );
    // if (message.content.includes('cat')) {
    //   const cat = async () => {
    //     const { file } = await fetch('https://aws.random.cat/meow');
    //     const data = await file.json();
    //     console.log(data);
    //   };
    //   message.channel.send(cat);
    // }
  },
};
