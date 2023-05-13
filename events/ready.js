const client = require("../index");
client.on("ready", () => {
console.log(`READY!! ${client.user.username}`)
})
