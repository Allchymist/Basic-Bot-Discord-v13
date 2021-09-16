const { readdirSync } = require('fs');

module.exports = (client) => {
const eventFolder = readdirSync("./src/events/").filter(f => f.endsWith(".js"));
    for (const events of eventFolder) {
        const event = require(`../events/${events}`);
        const name = event.name;
        const value = (...args) => event.execute(...args, client);
        event.once ? client.once(name, value) : client.on(name, value);
    }
}
