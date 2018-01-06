const fs =require('fs');
var consoleModules = [];
var load = function (client, config) {
    fs.readdir('./console', (err, files) => {
        if (err) {
            console.log(err);
            return [];
        }
        files.forEach(file => {
            if (!file.startsWith('--')) {
                consoleModules[require('./' + file).name] = require('./' + file);
                var pushed = consoleModules[require('./' + file).name];
                pushed.init(client, config);
            }
        });
    });
    return consoleModules;
}

var use = function (modules) {
    process.openStdin()
        .addListener('data', d => {
            var data = d.toString().trim().split(' ');
            if (`${data[0]}` == '') {
                process.stdout.write('\n > '.green);
                return;
            }
            if (consoleModules[data[0]] != undefined) {
                consoleModules[data[0]].do(data.slice(1));
                process.stdout.write('\n > '.green);
            } else {
                console.log(('\n << Unknown command ' + `'${data[0]}'`).red);
                process.stdout.write('\n > '.green);
            }
        })
        .resume();
}

module.exports = {load: load, use: use};