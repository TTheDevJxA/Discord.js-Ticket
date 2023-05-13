var { Client, Collection, MessageEmbed,partials, Interaction } = require("discord.js")
var client = new Client({ intents:32767 })
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.events = new Collection()
client.config = require("./config.json");
client.mongo = require(`./mongodb.json`)

require("./handler")(client);

client.login(client.config.token);
