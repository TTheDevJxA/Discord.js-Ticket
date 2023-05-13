const { Interaction, Client, CommandInteraction, DiscordAPIError, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Role } = require("discord.js");

module.exports = {
  name: "ticket",
  description: "➡️ | Set up the tickets system",
  category: "Moderation",
  /**
   * 
   * @param {Interaction} interaction 
   * @param {Client} client
   */
  run: async (client, interaction, args) => {
    if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.followUp({ content: `❌ | You don't have the permissons that is required to perform this command.` })
    if (!interaction.guild.me.permissions.has("MANAGE_CHANNELS")) return interaction.followUp({ content: `❌ | I don't have the permissons that is required to perform this command.` })
    var allChannels = interaction.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').map(c => {
      return {
        label: c.name,
        value: c.id
      }
    });

    var e = new MessageEmbed()
      .setTitle(`Ticket setup`)
      .setDescription(`> Select the channel to send the message`)
      .setColor(`#5241b4`)
      .setThumbnail(`https://cdn.discordapp.com/avatars/1002665491590033440/7992c22fb779aad4456c117ec41fbe7c.png`)
      .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true }) || `https://cdn.discordapp.com/avatars/1002665491590033440/7992c22fb779aad4456c117ec41fbe7c.png`}` })

    if (allChannels.length > 25) {
      var firstHalf = allChannels.slice(0 , 25)
      var secondHalf = allChannels.slice(25 , 50)

      var firstMenu = new MessageSelectMenu()
        .setCustomId('channel-ticket')
        .setPlaceholder('Channel')
        .addOptions(firstHalf)

      var secondMenu = new MessageSelectMenu()
        .setCustomId('channel-ticket')
        .setPlaceholder('Channel')
        .addOptions(secondHalf)

      var row1 = new MessageActionRow()
        .addComponents(firstMenu)

      var row2 = new MessageActionRow()
        .addComponents(secondMenu)

      interaction.followUp({ embeds: [e], components: [row1, row2] });
    } else {
      var roleSelectMenu = new MessageSelectMenu()
        .setCustomId('channel-ticket')
        .setPlaceholder('Channel')
        .addOptions(allChannels)

      var row = new MessageActionRow()
        .addComponents(roleSelectMenu)

      interaction.followUp({ embeds: [e], components: [row] })
    }
  },
}
