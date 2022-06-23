const { Client, MessageEmbed } = require('discord.js');
const { botIntents, commands: cmd, prefix } = require('./config/config');
const config = require('./config/default');
const mongoose = require('mongoose')
const { db } = require('./test-schema');
const client = new Client({
  intents: botIntents,
  partials: ['CHANNEL', 'MESSAGE'],
});

client.on('ready', async () => {
  console.log('Logged in as ' + client.user.tag);
  await mongoose.connect(config.MONGO_DB, {})
});
//testi
client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  
  if (command === 'deletelast') {
    msg.channel.bulkDelete(args[0]);

    // Tässä on ojku 14 pivä hässäkkä se pitää muuttaa
  
  } else if (command === 'hold') {
    
    let y =  db.collection("motds")
    .find({})
    .toArray() 
      console.log(y)
  
      
     


  } else if (command === 'find') {
    let x = await db.collection('motds').findOne({ motd: `${args}` });
    if (x === null) {
      console.log('Not found');
      msg.channel.send('Not Found');
    } else {
      const gaga = new MessageEmbed()
      .setTitle (`${x.author}`)
     .setColor('#0099ff')
     .setAuthor('Message Of The Day')
     .setDescription(`${x.motd}`)
     msg.channel.send({ embeds: [gaga]})
     
      };
      
  } else if (command === 'form') {
     // Get the count of all users
     let y = motd.count().exec(function (err, count) {
    
      // Get a random entry
      let random = Math.floor(Math.random() * count)
    
      // Again query all users but only fetch one offset by our random #
      motd.findOne().skip(random).exec(
        function (err, result) {
          // Tada! random user
          console.log(result) 
        })
    })
    console.log('log',y)
    const gugu = new MessageEmbed()
      .setTitle (`${y.author}`)
     .setColor('#0099ff')
     .setAuthor('Message Of The Day')
     .setDescription(`${y.motd}`)
     msg.channel.send({ embeds: [gugu]})
    
  }
});
const startBot = () => {
  client.login(config.DISCORD_TOKEN);
};
module.exports = startBot;