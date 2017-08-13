/* Add -- to start of filename if you want to ignore file */
module.exports = new (require('../src/command.js'))('%name%', [ '%alias1%', '%alias2%' /* ... */], "%desc%", function ( message, config ){
    /* Optional */
    var embed = new (require('discord.js')).RichEmbed()
        .setTitle('%TITLE%')
        .setColor(config.defaultEmbedColor);
    /* END: Optional */
    return new (require('../src/commandReturn.js'))('%content%', embed /* or null */);
})