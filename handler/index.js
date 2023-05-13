const { glob } = require("glob");
const { promisify } = require("util");
const { Client , MessageEmbed, MessageActionRow , MessageButton, Interaction } = require("discord.js");
const { intersection } = require("lodash");
const { setTimeout, setInterval } = require("timers/promises");
var client = new Client({ intents: 32767})

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */


 module.exports = async (client) => {
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`)
    eventFiles.map((value) => require(value))

    const slashCommands = await globPromise(`${process.cwd()}/SlashCommands/*/*.js`)
    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value)
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);
        if (["MESSAGE", "USER"].includes(file.type)) delete file.description
 
        arrayOfSlashCommands.push(file)
    })
client.on(`ready`, () => {
  //client.application.commands.set(arrayOfSlashCommands)// all guilds
  client.guilds.cache.get(`1087411867770699897`).commands.set(arrayOfSlashCommands)//single guild
})





 }