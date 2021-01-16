const path = require('path');
const minimist = require('minimist');
const { chromium } = require('playwright');
const { writeTxt } = require('./text.js')
const { writeCsv } = require('./csv.js')

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

async function run() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(args.url);
    await page.waitForSelector('.message-list');

    const boardTitle = await page.$eval('#board-name', (node) => node.innerText.trim());

    if (!boardTitle) {
        throw 'Board title does not exist. Please check if provided URL is correct.'
    }

    let parsedText = boardTitle + '\n\n';

    const columns = await page.$$('.message-list');

    for (let i = 0; i < columns.length; i++) {
        const columnTitle = await columns[i].$eval('.column-header', (node) => node.innerText.trim());

        const messages = await columns[i].$$('.message-main');
        if (messages.length) {
            parsedText += columnTitle + '\n';
        }
        for (let i = 0; i < messages.length; i++) {
            const messageText = await messages[i].$eval('.message-body .text', (node) => node.innerText.trim());
            const votes = await messages[i].$eval('.votes .vote-area span.show-vote-count', (node) => node.innerText.trim());
            parsedText += `- ${messageText} (${votes})` + '\n';
        }

        if (messages.length) {
            parsedText += '\n';
        }
    }
    return parsedText;
}

function writeToFile(filePath, data, exportType) {
    const resolvedPath = path.resolve(filePath || `../${data.split('\n')[0].replace('/', '')}.txt`);
    switch (exportType) {
        case "csv":
            writeCsv(resolvedPath, data)
            break;
        case "txt":
        default:
            writeTxt(resolvedPath, data)
    }
}

function handleError(error) {
    console.error(error);
}

run().then((data) => writeToFile(args.file, data, args.exportType)).catch(handleError);