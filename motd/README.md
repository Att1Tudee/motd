You must add a default.js file into /config which contains info on your Discordbot Token, and mongoDB address+pw
```
const config = {
  DISCORD_TOKEN: '*token*',
  MONGO_DB: '*mongo access*'
};

module.exports = config;
```


Use `npm run app` to run the server and bot using nodemon.
Use `npm start` to run the server and bot without nodemon.
