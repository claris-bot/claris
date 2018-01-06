var colors = require('colors');
colors.enabled = true;

var lastError = null;

var child = null;
process.stdin.resume();

function exitEvent( code ) {
    if (code == 30001) {
        child.removeAllListeners();

        child = require('child_process').spawn('node', ['main.js'].concat(process.argv.slice(2)));
        process.stdin.pipe(child.stdin);
        process.stdin.resume();
        child.stdout.pipe( process.stdout );
        child.stderr.pipe( process.stderr );

        child.on('exit', exitEvent);

        console.log('[ProcessManager(Claris)] Restarting main process (restart command)...'.green);

    } else if (code != 30001 && code != 0) {
        child.removeAllListeners();

        if (lastError != null && new Date() - lastError < 5000) {
            console.log('[ProcessManager(Claris)] Stopped because of fast error repeat.'.red);
            process.exit(0);
        } else if (lastError == null) {
            lastError = new Date();
        }

        child = require('child_process').spawn('node', ['main.js'].concat(process.argv.slice(2)));
        process.stdin.pipe(child.stdin);
        process.stdin.resume();
        child.stdout.pipe( process.stdout );
        child.stderr.pipe( process.stderr );

        child.on('exit', exitEvent);

        console.log('[ProcessManager(Claris)] Restarting main process because of code error...'.green);
    } else { process.exit(0); }
}

(function() {

    child = require('child_process').spawn('node', ['main.js'].concat(process.argv.slice(2)));
    process.stdin.pipe(child.stdin);
    process.stdin.resume();
    child.stdout.pipe( process.stdout );
    child.stderr.pipe( process.stderr );

    child.on('exit', exitEvent);

    console.log('[ProcessManager(Claris)] Started main process'.green);
})();