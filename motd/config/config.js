const { Intents } = require('discord.js');

const { DIRECT_MESSAGES, GUILD_MESSAGES, GUILDS } = Intents.FLAGS;

const botIntents = [DIRECT_MESSAGES, GUILD_MESSAGES, GUILDS];

const commands = {
  getName: 'get-name',
  tellJoke: 'tell-a-joke',
  sad: 'sad',
  lastMsgs: 'last-messages',
  deleteLast1: 'deletelast1',
  deleteLast5: 'deletelast5',
  deleteLast100: 'deletelast100',
  help: 'help',
  addLine: 'addline',
};

const prefix = '!';

module.exports = { botIntents, prefix, commands };
