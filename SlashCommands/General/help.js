const { Client, CommandInteraction, DiscordAPIError , MessageEmbed , MessageButton , MessageCollector ,MessageActionRow , Interaction} = require("discord.js");
var config = require(`../../config.json`)
var ms = require(`ms`)
module.exports = {
    name: "help",
    category : "General",
    description: "➡️ | Need help?",

/**
 * 
 * @param {Interaction} interaction 
 */
    run: async (client, interaction, args) => {
        var slash = client.slashCommands
       
var e = new MessageEmbed()
.setTitle(`Commands List`)
.setColor(`#5241b4`)
.setThumbnail(`${interaction.guild.iconURL({dynamic : true})}`)
.addField(`General [${slash.filter((m) => m.category === "General").size}]:`,`\`\`\`${slash.filter((m) => m.category === "General").map((m) => `${m.name}`).join(" , ")}\`\`\``)
.addField(`Moderation [${slash.filter((m) => m.category === "Moderation").size}]:`,`\`\`\`${slash.filter((m) => m.category === "Moderation").map((m) => `${m.name}`).join(" , ")}\`\`\``)
.setTimestamp()
.setFooter(`All commands [${slash.size}]`)
.setAuthor({name : `${interaction.guild.name}`, iconURL : `${interaction.guild.iconURL({dynamic : true}) || `https://cdn.discordapp.com/avatars/1002665491590033440/7992c22fb779aad4456c117ec41fbe7c.png`}`})
interaction.followUp({embeds : [e]})

    }
}
