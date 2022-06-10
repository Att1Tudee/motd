You must add a default.js file into /config which contains info on your Discordbot Token, and MongoDB address+pw
```
const config = {
  DISCORD_TOKEN: 'Discordbot Token',
  MONGO_DB: 'MongoDB address+pw'
};

module.exports = config;
```

Use `npm run app` to run the server and bot using nodemon.
Use `npm start` to run the server and bot without nodemon.
