const fs = require('fs');

var loadAndUse = function (client, config) {
    var commands = [];
    fs.readdir('./commands', (err, files) => {
        files.forEach(file => {
            if (!file.startsWith('--')) {
                var pushed = commands[commands.push(require('./' + file)) - 1];
                client.on('message', message => {
                    if (message.author == client.user) {
                        return;
                    }
                    var canDo = true;
                    if (!(message.content.toLowerCase().startsWith(`${config.prefix}${pushed.name} `) || message.content.toLowerCase() == `${config.prefix}${pushed.name}`)) {
                        canDo = false;
                    }
                    pushed.aliases.forEach(alias => {
                        if ((!canDo == true) && message.content.startsWith(config.prefix + alias)) {
                            canDo = true;
                        }
                    });
                    if (canDo == false) {
                        return;
                    }
                    var result = pushed.do(message, client);
                    if (result == 'DID_IT') {
                        return;
                    } else {
                        if (result.embed != null) {
                            message.reply('', {
                                embed: result.embed
                            });
                        } else {
                            message.reply(result.content);
                        }
                    }
                });
            };
        });
    });
}

module.exports = {loadAndUse: loadAndUse};