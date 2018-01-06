module.exports = new (require('../src/command.js'))('ping', 'ping', ['test', 'dead?'], "odpowiada 'ping'", function ( message, config, client ){
    var embed = new (require('discord.js')).RichEmbed()
        .setTitle('Pong!')
        .setColor(config.defaultEmbedColor);
    return new (require('../src/commandReturn.js'))(null, embed);
})