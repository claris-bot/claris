var discordMessage = require('discord.js').Message;
var commandReturn = require('./commandReturn.js');
class Command {
    /**
     * Command name.
     * @type {string}
     * @memberof Command
     */
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    /**
     * Name in help.
     * 
     * @type {string}
     * @memberof Command
     */
    get helpName() {
        return this._helpName;
    }

    set helpName(value) {
        this._helpName = value;
    }

    /**
     * Command aliases.
     * @type {Array.<string>}
     * @memberof Command
     */
    get aliases() {
        return this._aliases;
    }

    set aliases(value) {
        this._aliases = value;
    }

    /**
     * Command description (help)
     * @type {string}
     * @memberof Command
     */
    get desc() {
        return this._desc;
    }

    set desc(value) {
        this._desc = value;
    }

    /**
     * Callback. Must return CommandReturn instance.
     *
     * @type {Function}
     * @memberof Command
     * 
     * @example
     * function ( message, config ) {
     *   return new (require('../src/commandReturn.js'))('Hello World!');
     * }
     */
    get callback() {
        return this._callback;
    }

    set callback(value) {
        this._callback = value;
    }
    /**
     * Creates an instance of Command.
     * @param {string} name Name of this command.
     * @param {Array.<string>} aliases Command aliases.
     * @param {string} helpName Name in help.
     * @param {string} desc Description of this command.
     * @param {function} callback Callback function that returns result of this command.
     * @memberof Command
     */
    constructor( name, helpName, aliases, desc, callback ) {
        this.name = name;
        this.helpName = helpName;
        this.aliases = aliases;
        this.desc = desc;
        this.callback = callback;
    }

    /**
     * Executes command.
     * 
     * @param {discordMessage} message
     * @returns {commandReturn}
     * @memberof Command
     */
    do( message, client ) {
        return this.callback( message, require('../cache/config.json'), client );
    }
}
module.exports = Command;