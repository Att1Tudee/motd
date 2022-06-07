const { Client, MessageEmbed } = require('discord.js');
const { botIntents, commands: cmd, prefix } = require('./config/config');
const config = require('./config/default');
const Math = require('Mathjs')
const mongoose = require('mongoose')
const testSchema = require('./test-schema');
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
  if (!msg.content.startsWith(prefix)) return; // do nothing if prefix isn't used.

  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  // let queryid =

  /*--------------------------------------------------------------------------
  -------------------Delete last lines by user number input-------------------
  --------------------------------------------------------------------------*/

  if (command === 'deletelast') {//Deletelast + space and number of messages
    msg.channel.bulkDelete(args[0]);

    /*----------------------------------------------------------------------------
      -------------------------Add a line by user input---------------------------
      --------------------------------------------------------------------------*/


  } else if (command === 'addline') {
    /*             Should create last id in key value each time a sentence is sent in database,
                   give ID for msg reading last given ID in database
                  
                   */

    //             db.collection('sentences').find({ id: `${args}`})
    setTimeout(async () => {
      await new testSchema({ message: `${args}`, id: '1' }).save()
    }, 1000)



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
      
     /* console.log(x.motd + ' ' + x.author)
      let y = db.collection('motds').aggregate([{ $sample: { size: 1 } }])
      let z = require('util').inspect(y)
     
      console.log(JSON.stringify(z))
    msg.channel.send(`${z}` || "None");


      // let y = require('util').inspect(x.motd) //Bot posts embed but with blabber, JSON.stringify fixes this
      /*console.log(JSON.stringify(x))
      const rawr = JSON.stringify(x, (key, value) => {
        if (key === "level" || key === "_id" ) {
          return undefined;
        }
        return value;
    
       
     
      
    }
// test bot output in diferent forms */
  } else if (command === 'form') {
    //let z = db.collection('motds').countDocuments(key, value)
    
    const z = db.collection('motds').find()
    console.log(z) // gives only undefined out

  } else if (command === 'post2') {
  let y = Math.floor(Math.random() * 10) // Testing for random index from database(put 10 into max number of keys)
  console.log(y)

  


    /* 
    let x = db.collection('motds')[Math.floor(Math.random() * motds.length)]
    
  /*  MySchema.statics.random = async function() {
      const count = await this.count();
      const rand = Math.floor(Math.random() * count);
      const randomDoc = await this.findOne().skip(rand);
      return msg.channel.send(randomDoc);
    };
   /* let x = db.collection('motd').aggregate([{ $sample: { size: 1 } }])
    msg.channel.send(`${x}` || "None");*/


    /* } else if (command === 'post2') {
       db.collection('motds').find({ motd: `${args}`})
       setTimeout(async () => {
         await new test-schema({currentindex: `${args}`}).save()
         }, 1000)
     
       /*} else if (command === 'test') {
       let x = db.collection('currentindexes').find();
       x = x + 1
       return msg.channel.send(`${x}`); // EI TOIMI
       */

  } else if (command === 'args-info') {
    if (!args.length) {
      return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
    }

    msg.channel.send(`Command name: ${command}\nArguments: ${args}`);
  }
});
/*if (userCmd === cmd.getName) {
  msg.reply(msg.author.username);
} else if (userCmd === cmd.deleteLast1) {
  msg.channel.bulkDelete(2);
} else if (userCmd === cmd.help) {
  msg.channel.send("Available commands: deletelast1, deletelast5,deletelast100");
} else if (userCmd === cmd.deleteLast5) {
  msg.channel.bulkDelete(6);
} else if (userCmd === cmd.deleteLast100) {
  msg.channel.bulkDelete(100);
} else if (userCmd === cmd.tellJoke) {
  msg.channel.send("**HTML** bla bla bla.\nI really don't have a joke");
} else if (userCmd === cmd.sad) {
  msg.reply("Don't be sad! This is not the end of the road");
 
    
} else if (userCmd === cmd.lastMsgs) {
  const reply = await getLastMsgs(msg);
  msg.author.send({ embeds: reply });
} else {
  msg.reply('I do not understand your command');
}
});
*/
const getLastMsgs = async (msg) => {
  // fetching the last 10 messages
  const res = await msg.channel.messages.fetch({ limit: 10 });

  const lastTenMsgs = res.map((message) => {
    return message.content;
  });

  const embeds = [];

  lastTenMsgs.forEach((msg, index) => {
    const embed = new MessageEmbed()
      .setColor('ORANGE') // can be hex like #3caf50
      .setTitle(`Message ${index + 1}`)
      .setDescription(`${msg}`)
      .setFooter('Buddy saysS HHi');

    embeds.push(embed);
  });

  return embeds;
};

const startBot = () => {
  client.login(config.DISCORD_TOKEN);
};


module.exports = startBot;

/* Poisto, ja lisäys onnistuu
ID:n teko for-lausekkeella
Poisto ID:n perusteella, ja ID:n tulostus 
a toteutus*/
