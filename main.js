const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client();

const colors = require('colors');
colors.enabled = true;

const config = require('./cache/config.json');

var command = require('./src/command.js');

require('./modules/--load.js').loadAndUse(client, config);
require('./commands/--load.js').loadAndUse(client, config);
require('./console/--load.js').use(require('./console/--load.js').load(client, config));
client.on('ready', () => {
    console.log(' < '.cyan + 'Ready!'.reset);
    process.stdout.write('\n > '.green);
});

client.login(config.token);