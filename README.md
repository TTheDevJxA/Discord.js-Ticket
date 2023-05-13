# Discord.js-Ticket

# Usage

* Go to __config.json__ and fill the required things
* Go to __mongodb.json__ and PUT THE MONGO CONNECT URL!!
* Go to __handler/index.js:31__ put the guild id for single guild use.
* __Node.js v16__ or latest version is __required__
* __Discord.js v13.14.0__ is __required!__
* Run the command __/ticket__ to start the bot

## How to use the slash commands for all guild?

__Go to handler/index.js:47 and type the following code:__

```
client.on("ready", () => {
client.application.commands.set(arrayOfSlashCommands)
})
```

## Copyrights

* handler is for __recondev__
* Any other code in this project is fully made by [JxA](https://thedevjxa.ga).
* if you need any help [contact](https://thedevjxa.ga) me :D
<h1 style="red"> This project is made by <a href="https://thedevjxa.ga">thedevjxa</a> it was made with love and hard-working </h1>
