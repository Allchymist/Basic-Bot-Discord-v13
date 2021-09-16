module.exports = {
    name: "interactionCreate",
    async execute(i, client) {
        if (!i.isCommand()) return;

        const command = client.commands.get(i.commandName);
        if (!command) return;

        try {
            await command.execute(client, i);
        } catch (error) {
            console.error(error);
            await i.reply({ content: 'Ocorreu um Erro!', ephemeral: true });
        }
    }
}
