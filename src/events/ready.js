module.exports = {
    name: "ready",
    async execute(client) {
        console.log(`Olá Mundo\nEstou Online: ${client.user.tag}`);
    }
}