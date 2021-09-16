const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Informações sobre a latência!"),
    async execute(bot, i) {
        await i.reply(`Latência do Servidor: **${Date.now() - i.createdTimestamp}ms**\nLatência da API: **${Math.round(client.ws.ping)}ms**`);
    }
}