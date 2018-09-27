const Discord = require('discord.js');
const client = new Discord.Client();

whiteListedUsers = [{username: 'ratxt1', discriminator: '4755'}, {username: 'Redless', discriminator: '6817'}]
channelIDs = {dead: '494984385053851659', weebs: '494987809182973953', games: '494987767982325760'} //need to be changed for the channel you make the bot in. you can find these with !parent command.

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '!what is love') {
    msg.channel.send('baby don\'t hurt me');
  }
  if (isWhitelisted(msg.author)) {
    splitMessage = msg.content.split(' ')
    
    if (splitMessage[0] === '!create-channel') {
      msg.guild.createChannel(splitMessage[1], 'text')
      .then((data) => data.setParent(msg.channel.parentID))
      .catch(console.error);
    }

    if (msg.content === '!bury-channel') {
      msg.channel.setParent(channelIDs.dead)
    }

    if (splitMessage[0] === '!move-channel') {
      let newChannel = splitMessage[1]
      if (newChannel === 'default') {
        msg.channel.setParent(null)
      }
      if (channelIDs[newChannel] != undefined) {
        msg.channel.setParent(channelIDs[newChannel])
      }
    }

    if (msg.content === '!parent') {
      console.log(msg.channel.parentID)
    }
    if (msg.content === '!commands-list') {
      msg.channel.send('<https://pastebin.com/zb7C7JEV>')
    }
   
  }
});
client.login([INSERT BOT TOKEN HERE]);

function isWhitelisted(author) {
  for (let i = 0; i < whiteListedUsers.length; i++) {
    if (author.username === whiteListedUsers[i].username && author.discriminator === whiteListedUsers[i].discriminator) {
      return true
    }
  }
  return false
}