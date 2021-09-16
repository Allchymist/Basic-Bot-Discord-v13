const { readdirSync } = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientID, guildID, token } = require("../../config.json");

module.exports = (client) => {
    const commands = [];

    const commandFolder = readdirSync("./src/commands/");
    for (const folder of commandFolder) {
        const commandFile = readdirSync(`./src/commands/${folder}`).filter(f => f.endsWith(".js"));
        for (const file of commandFile) {
            const command = require(`../commands/${folder}/${file}`);
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        }
    }

    const rest = new REST({ version: '9' }).setToken(token);
    
    (async () => {
        try {
            await rest.put(
                Routes.applicationGuildCommands(clientID, guildID),
                { body: commands },
            );
    
            console.log('Comandos Registrados!');
        } catch (error) {
            console.error(error);
        }
    })();
}