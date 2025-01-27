const { chromium } = require('playwright');

const importTxt = async(url) => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector('.message-list');

    const boardTitle = await page.$eval('#board-name', (node) => node.innerText.trim());

    if (!boardTitle) {
        throw 'Board title does not exist. Please check if provided URL is correct.';
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

module.exports = { importTxt };