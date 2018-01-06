module.exports = {
    name: 'clear',
    desc: 'Clears the console.',
    do: (args) => {
        process.stdout.write('\033c');
    },
    init: (client, config) => {
        return true;
    }
}