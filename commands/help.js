const fs = require('fs');

var cache = undefined;
var descriptionc = undefined;
var prefix = '';

function cacheCommands() {
    fs.readdirSync('./commands').forEach((file) => {
        if (!file.startsWith('--')) {
            var obj = require('./' + file);
            cache.push(`**${prefix}${obj.helpName}** - ${obj.desc}`);
        }
    })
}
module.exports = new(require('../src/command.js'))('help', 'help', [], "odpowiada 'ping'", function (message, config, client) {
    if (cache == undefined) {
        prefix = config.prefix;
        cache = [];
        cacheCommands();
    }
    var embed = new(require('discord.js')).RichEmbed();
    embed
        .setTitle('Pomoc')
        .setColor(config.defaultEmbedColor)
    if (descriptionc == undefined) {
        descriptionc = '';
        cache.forEach(function (element) {
            descriptionc += ("\n" + element);
        }, this);
    }
    embed.setDescription(descriptionc);
    return new(require('../src/commandReturn.js'))(null, embed);
});