const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription("Avatar do Usuário!")
    .addUserOption(options => 
        options.setName('membro')
        .setDescription('Avatar do Usuário Mencionado!')
        .setRequired(false)),
    async execute(client, i) {
        const user = i.options.getUser('membro') || i.user;

        const embed = new MessageEmbed()
            .setDescription(`Avatar de **[${user.username}](${user.displayAvatarURL()})**`)
            .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
            .setFooter(`Pedido por ${i.user.username}`)
        
        await i.reply({embeds: [embed]});
    }
}
