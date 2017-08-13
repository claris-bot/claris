const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client();

const config = require('./cache/config.js');

var command = require('./src/command.js');
/**
 * @type {Array.<any>}
 */
var modules = [];
/**
 * @type {Array.<command>}
 */
var commands = [];

fs.readdir('./modules', (err, files) => {
  files.forEach(file => {
    if ( !file.startsWith('--') ) {
      var pushed = modules[modules.push( require('./modules/' + file) ) - 1];
      pushed.init( client, config );
    }
  });
});

fs.readdir('./commands', (err, files) => {
  files.forEach(file => {
    if ( !file.startsWith('--') ) {
      var pushed = commands[commands.push( require('./commands/' + file) ) - 1];
      client.on( 'message', message => {
        if ( message.author == client.user) {return;}
        var canDo = true;
        if ( !message.content.startsWith( `${config.prefix}${pushed.name}` ) ) { canDo = false; }
        pushed.aliases.forEach( alias => {
          if ( ( ! canDo == true ) && message.content.startsWith(config.prefix + alias) ) {
            canDo = true;
          }
        });
        if (canDo == false) {return;}
        var result = pushed.do( message );
        if (result.embed != null ) {
          message.reply( '', {embed: result.embed} );
        } else { message.reply( result.content ); }
      } );
    }
  });
});

var args = process.argv.slice(2);
console.log( args );

client.on( 'ready', () => {
    console.log('Ready!');
});

client.login( config.token );