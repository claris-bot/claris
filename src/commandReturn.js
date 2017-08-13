var discordEmbed = (require('discord.js')).RichEmbed;
class CommandReturn {
    /**
     * Creates an instance of CommandReturn.
     * @param {string} content Command result message (required, but if embed specified, can be empty.)
     * @param {discordEmbed} [embed=NULL] Embed of command.
     * @memberof CommandReturn
     */
    constructor( content, embed=NULL )
    {
        this.content = content;
        this.embed = embed;
    }
}

module.exports = CommandReturn;