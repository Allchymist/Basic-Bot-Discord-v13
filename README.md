# Código de Exemplo Discord Bot - v13

## Explicando `config.json`

> Arquivo onde normalmente é guardada as informações de um projeto! nesse arquivo pode conter **prefixo, token e etc**.
No nosso caso além de guardarmos o **prefixo e token** guardaremos também **guildID e clientID**!

Não tem segredo, caso queira trocar, basta substituir: `!`, `TOKEN DO BOT`, `ID DA GUILD` e `ID DO BOT` pelo seu prefixo, ID da sua Guild e do seu Bot!
```json
{
  "prefix": "!",
  "token": "TOKEN DO BOT",
  "guildID": "ID DA GUILD",
  "clientID": "ID DO BOT"
}
```

## Explicando `index.js`

### INTENTS
**Os Gateway Intents foram introduzidos pela Discord para que os desenvolvedores de bots possam escolher
quais eventos seus bots recebem com base em quais dados precisam para funcionar. Intents são grupos nomeados 
de eventos WebSocket predefinidos, que o cliente discord.js receberá. Se você omitir `DIRECT_MESSAGE_TYPING`, por exemplo, 
não receberá mais eventos de digitação de mensagens diretas. Se você não fornecer intents, discord.js gerará um erro. 
O Discord define algumas intenções como "privilegiadas" devido à natureza sensível dos dados.No momento em que este artigo foi escrito, a
s intenções privilegiadas eram `GUILD_PRESENCES` e `GUILD_MEMBERS`. Caso seu Bot não esteja verificado e/ou não esteja em 100 Guilds você pode ativar as INTENTS
como explicado abaixo!**

> Na ultima versão do discord, vulgo **v13** as intents tornaram-se obrigatórias, você precisa ativar elas no site do 
[Discord Developer](https://discord.com/developers/applications/) e no seu código!

No site vá em **applications > [sua aplicação] > bot > Privileged Gateway Intents > Ative `PRESENCE INTENT` e `SERVER MEMBERS INTENT`**

![discordSite](https://i.imgur.com/c5lbIKl.png)

> Pelo Código há duas formas, veja abaixo!

Declarando INTENTS Padrôes
```javascript
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
```

Declarando Todas INTENTS (recomendável apenas quando necessário)
```javascript
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: new Intents(32767) });
```

### COLLECTION
**Um mapa com métodos utilitários adicionais. Isso é usado em `discord.js` em vez de Arrays para qualquer coisa que tenha um ID, 
para desempenho significativamente aprimorado e facilidade de uso.**

> Um exemplo que podemos usar numa `Collection` é quando salvamos os comandos e até mesmo cooldowns (*se refere ao tempo de espera para o uso de algo*).

No Arquivo Principal, `index.js`
```javascript
const { Collection } = require("discord");

<Client>.cooldown = new Collection();
```
Setando os Comandos
```javascript
const { readdirSync } = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientID, guildID, token } = require("./config.json");

module.exports = (client) => {
  const commands = [];
    
  const commandFolder = readdirSync("./commands/").filter(file => file.endsWith('.js'));
  for (const file of commandFolder) {
      const command = require(`./commands/${file}`)
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
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
```
Usando Comandos
```javascript
const { prefix } = require("./config.json");

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
```
Comando `Ping`
```javascript
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
data: new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Latência da API e Guild'),
  async execute(client, i) {
     await i.reply("🏓 Pong!");
  }
}
```
> O que acabamos de ver é um basico exemplo de como uma `Handler` funciona. Você tambem pode adaptar para usar os comandos comuns de Bots ao invés de SlashCommands!

## `APIs`, `Módulos` e `Dependências` usadas no code
* [npm install discord.js](https://www.npmjs.com/package/discord.js)
* [npm install @discordjs/builders](https://www.npmjs.com/package/@discordjs/builders)
* [npm install @discordjs/rest](https://www.npmjs.com/package/@discordjs/rest)
* [npm install discord-api-types](https://www.npmjs.com/package/discord-api-types)

# Arigato :3
