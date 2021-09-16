const { Client, Intents, Collection } = require("discord.js");
const { token, prefix } = require("./config.json");
const { readdirSync } = require('fs');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();

client.prefix = prefix;

const commandHandler = readdirSync("./src/handlers/").filter(f => f.endsWith(".js"));
for (file of commandHandler) { require(`./src/handlers/${file}`)(client) }

client.login(token)
