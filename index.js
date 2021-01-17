const minimist = require('minimist');
const { exportTxt, exportCsv } = require('./export');

let args = minimist(process.argv.slice(2), {
    alias: {
        u: 'url',
        f: 'file',
        e: 'exportType'
    }
});

if (!args.url) {
    throw `Please provide a URL with '-u "<url>"'`;
}

const run = () => {
    switch (args.exportType) {
        case "csv":
            exportCsv(args.url, args.file);
            break;
        case "txt":
        default:
            exportTxt(args.url, args.file);
    }
}

run();