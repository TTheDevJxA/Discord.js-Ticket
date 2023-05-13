const client = require("../index");
var {MessageActionRow , MessageButton , MessageEmbed, Collection, ButtonInteraction} = require(`discord.js`)
var { Database } = require(`quickmongo`)

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
       await interaction.deferReply({ ephemeral: false }).catch(() => {})
        const cmd = client.slashCommands.get(interaction.commandName)
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " })

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name)
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value)
                })
            } else if (option.value) args.push(option.value)
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id)
        userTag = client.users.cache.get(interaction.member.id).tag
        cmd.run(client, interaction, args)
    }

if(interaction.isButton()) {

if(interaction.customId === `ticket-create`) {
    var ticket1 = new Database(client.mongo.TicketSystem)
    var supportRole = interaction.guild.roles.cache.get(client.config.ticketRole)
    var isCreated = await ticket1.get(`userTicket_${interaction.member.id}.${interaction.guild.id}`)

    if(isCreated === true) {
        interaction.reply({content : `❌ | You already have a ticket opened`, ephemeral : true})
    }
else {

var closebutton = new MessageActionRow().addComponents(
    new MessageButton()
    .setLabel(`Close`)
    .setEmoji(`🔒`)
    .setCustomId(`close-ticket`)
    .setStyle(`SECONDARY`),
    new MessageButton()
    .setLabel(`Delete`)
    .setEmoji(`🗑️`)
    .setCustomId(`delete-ticket`)
    .setStyle(`DANGER`),
    new MessageButton()
    .setLabel(`Claim`)
    .setEmoji(`🤚`)
    .setCustomId(`claim-ticket`)
    .setStyle(`SUCCESS`),
    new MessageButton()
    .setLabel(`Transcript`)
    .setEmoji(`📕`)
    .setCustomId(`copy-ticket`)
    .setStyle(`SUCCESS`),
    ); 

interaction.guild.channels.create(`ticket-${interaction.member.id}`, {
    type : `GUILD_TEXT`,
    permissionOverwrites:[
        {
     id: interaction.member.id,
     allow: ["SEND_MESSAGES","VIEW_CHANNEL"],
  },
  {
    id: client.user.id,
    allow:["VIEW_CHANNEL","SEND_MESSAGES","MANAGE_CHANNELS","EMBED_LINKS","ATTACH_FILES","ADD_REACTIONS","MENTION_EVERYONE","MANAGE_MESSAGES","READ_MESSAGE_HISTORY"]
  },
  {
    id:supportRole,
    allow:["VIEW_CHANNEL","SEND_MESSAGES","READ_MESSAGE_HISTORY"]
  },
  {
    id: interaction.guild.roles.everyone,
    deny:["VIEW_CHANNEL"]
  }
      ]
}).then(async (channel) => {
    interaction.reply({content : `✅ | Ticket created <#${channel.id}>`, ephemeral : true})
    var e = new MessageEmbed()
    .setTitle(`Wait for the support to help you.`)
    .setDescription(`> Type your problem here.`)
    .setFooter(`Tap the 🔒 to close the ticket`)
    .setColor(`GREEN`)
    .setURL(``)
    .setThumbnail(`${interaction.member.displayAvatarURL({dynamic : true})}`)
    channel.send({content : `<@${interaction.member.id}>`, embeds : [e], components : [closebutton]})
    var ticket1 = new Database(client.mongo.TicketSystem)
    await ticket1.set(`userTicket_${interaction.member.id}.${interaction.guild.id}`,true)
await ticket1.set(`channel_${interaction.member.id}_${interaction.guild.id}`,channel.id)

})
}
}
if(interaction.customId === `close-ticket`) {
    var ticket1 = new Database(client.mongo.TicketSystem)
    var supportRole = interaction.guild.roles.cache.get(client.config.ticketRole)
    await ticket1.deleteAll(`userTicket_${interaction.member.id}.${interaction.guild.id}`)
//var channel = await ticket1.get(`channel_${interaction.member.id}_${interaction.guild.id}`)
var ch = interaction.guild.channels.cache.get(interaction.channel.id)
ch.permissionOverwrites.set([
    {
        id: interaction.member.id,
        deny: ["SEND_MESSAGES","VIEW_CHANNEL"],
     },
     {
       id: client.user.id,
       allow:["VIEW_CHANNEL","SEND_MESSAGES","MANAGE_CHANNELS","EMBED_LINKS","ATTACH_FILES","ADD_REACTIONS","MENTION_EVERYONE","MANAGE_MESSAGES","READ_MESSAGE_HISTORY"]
     },
     {
       id:supportRole,
       allow:["VIEW_CHANNEL","SEND_MESSAGES","READ_MESSAGE_HISTORY"]
     },
     {
       id: interaction.guild.roles.everyone,
       deny:["VIEW_CHANNEL"]
     }
    ])
   
await ticket1.delete(`channel_${interaction.member.id}_${interaction.guild.id}`)

var buttonsAfterClose = new MessageActionRow().addComponents(
    new MessageButton()
    .setLabel(`Delete`)
    .setEmoji(`🗑️`)
    .setCustomId(`delete-ticket`)
    .setStyle(`DANGER`),
    new MessageButton()
    .setLabel(`Transcript`)
    .setEmoji(`📕`)
    .setCustomId(`copy-ticket`)
    .setStyle(`SUCCESS`),
    ); 

var e = new MessageEmbed()
.setTitle(`Ticket Closed`)
.setColor(`GREEN`)
.setDescription(`\`\`\` Ticket has been closed by ${interaction.user.tag}\`\`\``)
.setTimestamp()
interaction.reply({embeds : [e], components : [buttonsAfterClose]})
interaction.channel.setName(`closed-ticket`)
}
if (interaction.customId === `delete-ticket`) {
    var ticket1 = new Database(client.mongo.TicketSystem);
    var supportRole = interaction.guild.roles.cache.get(client.config.ticketRole);
    await ticket1.deleteAll(`userTicket_${interaction.member.id}.${interaction.guild.id}`)
 
    if (!interaction.member.roles.cache.has(supportRole.id)) {
      interaction.reply({ content: `❌ | You must have ${supportRole} to do this action.`, ephemeral: true })
    } else {
      interaction.reply({ content: `✅ | Deleting.....` });
      setTimeout(() => {
        interaction.channel.delete(`Deleted by - ${client.user.tag}, it was a ticket!`)
          .catch(error => interaction.reply({ content: `❌ | An error has occurred and i couldn't delete the ticket.` }))
      }, 5000)
    }
  }
  

if(interaction.customId === `claim-ticket`) {
    var ticket1 = new Database(client.mongo.TicketSystem)
    var supportRole = interaction.guild.roles.cache.get(client.config.ticketRole)
    await ticket1.set(`userTicket_${interaction.member.id}.${interaction.guild.id}`,false)
var channel = await ticket1.get(`channel_${interaction.member.id}_${interaction.guild.id}`)
var ch = interaction.guild.channels.cache.get(channel)
if (!interaction.member.roles.cache.has(supportRole.id)) {
    interaction.reply({ content: `❌ | You must have ${supportRole} to do this action.`, ephemeral: true });
  } else {
    interaction.reply({content : `✅ | Ticket has been claimed by ${interaction.user.tag}`})  
  }
}

if(interaction.customId === `copy-ticket`) {
    var ticket1 = new Database(client.mongo.TicketSystem)
    var supportRole = interaction.guild.roles.cache.get(client.config.ticketRole)
    await ticket1.set(`userTicket_${interaction.member.id}.${interaction.guild.id}`,false)
var channel = await ticket1.get(`channel_${interaction.member.id}_${interaction.guild.id}`)
var ch = interaction.guild.channels.cache.get(channel)
if (!interaction.member.roles.cache.has(supportRole.id)) {
    interaction.reply({ content: `❌ | You must have ${supportRole} to do this action.`, ephemeral: true });
  } else {
    var discordTranscripts = require('discord-html-transcripts')
    var channel = interaction.channel
    var attachment = await discordTranscripts.createTranscript(channel)
    channel.send({ files: [attachment] })
  }

}




//buttons end
}

if(interaction.isSelectMenu()) {
if(interaction.customId === `channel-ticket`) {
    if(interaction.user.id !== interaction.user.id) return interaction.reply({content : `❌ | Not your menu!`, ephemeral : true})
    var selectedOption = interaction.values[0]
    
    var ticket = new Database(client.mongo.TicketSystem)
   await ticket.set(`channelTicket_${interaction.guild.id}.${interaction.guild.name}`,selectedOption)

   interaction.reply({content : `✅ | Channel selected!`, ephemeral : true})
var channel = interaction.guild.channels.cache.get(selectedOption)
var button = new MessageActionRow().addComponents(
    new MessageButton()
    .setLabel(`Create a ticket`)
    .setEmoji(`🎫`)
    .setCustomId(`ticket-create`)
    .setStyle(`SUCCESS`),
    ); 


var e = new MessageEmbed()
.setTitle(`Create a ticket`)
.setColor(`#5241b4`)
.setThumbnail(`https://cdn.discordapp.com/avatars/1002665491590033440/7992c22fb779aad4456c117ec41fbe7c.png`)
.setAuthor({name : `${interaction.guild.name}`, iconURL : `${interaction.guild.iconURL({dynamic : true}) || `https://cdn.discordapp.com/avatars/1002665491590033440/7992c22fb779aad4456c117ec41fbe7c.png`}`})
.setDescription(`> Press the button bellow to create a ticket.`)
channel.send({embeds : [e], components : [button]})
}

}




    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: true })
        const command = client.slashCommands.get(interaction.commandName)
        if (command) command.run(client, interaction)
    }
})