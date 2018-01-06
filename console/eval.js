var cli = null;
var con = null;
module.exports = {
    name: 'eval',
    desc: 'Evals node.js from string.',
    do: (args) => {
        console.log((' << ' + eval(args.join(''))).cyan);
    },
    init: (client, config) => {
        cli = client;
        con = config;
        return true;
    }
}