module.exports = new (require('../src/command.js'))('ping', ['test', 'dead?'], "odpowiada 'ping'", function ( message, config ){
    var embed = new (require('discord.js')).RichEmbed()
        .setTitle('Pong!')
        .setColor(config.defaultEmbedColor);
    return new (require('../src/commandReturn.js'))(null, embed);
})