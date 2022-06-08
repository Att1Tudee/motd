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
  
  } else if (command === 'remove') {
    db.collection('motd').deleteOne({ id: 12 });
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
    let y = await db.collection('motds').aggregate([{'$sample': {'size': 1 }}])
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