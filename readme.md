# Discord Message of the Day Bot Setup Guide

## Prerequisites

Before setting up the Discord Message of the Day (MotD) bot, ensure you have the following:

1. **MongoDB Database Access**: Sign up for a free MongoDB account at [MongoDB Cloud Atlas](https://www.mongodb.com/cloud/atlas/register).

2. **Discord Bot**: Create a Discord bot by registering an application at [Discord Developer Portal](https://discord.com/developers/applications).

3. **Discord Server**: You need a Discord server where you have the permission to invite the bot and manage messages.

4. **Docker**: Install Docker on the computer where you plan to run the bot. You can download Docker [here](https://www.docker.com/get-started).

## Environment Setup

Create a .env file for your environment settings. The file isn't generated because of security reasons. The file should contain the following information:

- Discord Bot Token
- MongoDB Connection String
- Database Name
 ```sh
   # .env file in discordbot folder
   TOKEN="<discord-bot-token>"
   MONGODB="<mongodb-connection-string>"
   DATABASE="data"
   ```
Add the file in both discordbot and webclient folders

## Running the Bot

### Discord Bot

Navigate to the `discordbot` folder and start the Discord bot using Docker.
```sh
    docker compose up -d
```
After docker does it's things, you should see your bot come online. 


### Web Client

Navigate to the `webclient` folder and start the web client using Docker.
```sh
    docker compose up -d
```
Visit [http://localhost:5000/](http://localhost:5000/) in your browser, and the web client should connect to your MongoDB database.

## Usage

1. Set up the bot channel by typing `!setchannel` in the desired channel (requires "Manage Messages" permission).

2. The web client is accessible at [http://localhost:5000/](http://localhost:5000/) to interact with the MongoDB database.

Feel free to customize and extend the functionality based on your preferences!
