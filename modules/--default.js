/* Add -- to start of filename if you want to ignore file */
var name = '%name%';

module.exports = {
    name: name,
    description: '%desc%',
    init: function( client, config ) {
        client.on( 'message', message => {
            if ( message.content.startsWith( `${prefix}${name}` ) ) {
                message.reply( 'Hello World!' );
            }
        } );
    }
};