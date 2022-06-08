Message of the day bot for Discord

Post a random Message Of The Day at certain time of day, in your discord channel.

currently wip



You must add a default.js file into /config which contains info on your Discordbot Token, and mongoDB address+pw

const config = {
  DISCORD_TOKEN: '*token*',
  MONGO_DB: '*mongo access*'
};

module.exports = config;
