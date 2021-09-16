module.exports = {
    name: "interactionCreate",
    async execute(i, bot) {
        if (!i.isCommand()) return;

        const command = bot.slash.get(i.commandName);
        if (!command) return;

        try {
            await command.execute(bot, i);
        } catch (error) {
            console.error(error);
            await i.reply({ content: 'Ocorreu um Erro!', ephemeral: true });
        }
    }
}