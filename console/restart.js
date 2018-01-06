module.exports = {
    name: 'restart',
    desc: 'Restarts the app.',
    do: (args) => {
        process.exit(30001)
    },
    init: (client, config) => {
        return true;
    }
}