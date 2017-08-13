const fs = require('fs');

var name = 'help';
var commands = [];
var embed = new (require('discord.js')).RichEmbed()
    .setTitle('Pomoc')
    .setDescription('');
module.exports = {
    name: name,
    description: 'pokazuje komendy bota',
    init: function( client, config ) {
        client.on( 'message', message => {
            if ( message.author == client.user) {return;}
            if ( message.content.startsWith( `${config.prefix}${name}` ) ) {
                embed.setColor(config.defaultEmbedColor);
                fs.readdir('./commands/', (err, files) => {
                    files.forEach(file => {
                        if ( !file.startsWith('--') ) {
                            var pushed = commands[commands.push( require('../commands/' + file) ) - 1];
                            embed.description += `**${config.prefix}${pushed.name}** - ${pushed.desc}\n`;
                        }
                    });
                    message.reply( '', {embed: embed} );
                });
            }
            embed = new (require('discord.js')).RichEmbed()
                .setTitle('Pomoc')
                .setColor(config.defaultEmbedColor)
                .setDescription('');
        } );
    }
};