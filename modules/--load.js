const fs =require('fs');
var loadAndUse = function (client, config) {
    var modules = [];
    fs.readdir('./modules', (err, files) => {
        files.forEach(file => {
            if (!file.startsWith('--')) {
                var pushed = modules[modules.push(require('./' + file)) - 1];
                pushed.init(client, config);
            }
        });
    });
}

module.exports = {loadAndUse: loadAndUse};