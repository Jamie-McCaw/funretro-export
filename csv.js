const { chromium } = require('playwright');

const importCsv = async(url) => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector('.message-list');

    const boardTitle = await page.$eval('#board-name', (node) => node.innerText.trim());

    if (!boardTitle) {
        throw 'Board title does not exist. Please check if provided URL is correct.';
    }

    let parsedText = "";
    const columns = await page.$$('.message-list');
    for (let i = 0; i < columns.length; i++) {
        const columnTitle = await columns[i].$eval('.column-header', (node) => node.innerText.trim());
        if (i === columns.length - 1) {
            parsedText += columnTitle;
        } else {
            parsedText += columnTitle + ",";
        }
    }
    parsedText += "\n";
    let boardCols = [];
    for (let i = 0; i < columns.length; i++) {
        const messages = await columns[i].$$('.message-main');
        let boardCol = [];
        for (let i = 0; i < messages.length; i++) {
            const messageText = await messages[i].$eval('.message-body .text', (node) => node.innerText.trim());
            const votes = await messages[i].$eval('.votes .vote-area span.show-vote-count', (node) => node.innerText.trim());
            let card = { message: messageText, votes: votes }
            boardCol.push(card);
        }
        boardCols.push(boardCol);
    }

    let maxLength = 0;
    boardCols.forEach(boardCol => {
        if (boardCol.length > maxLength) {
            maxLength = boardCol.length;
        }
    })

    for (let i = 0; i < maxLength; i++) {
        boardCols.forEach((boardCol, index) => {
            if (boardCol.length > i) {
                if (boardCol[i].votes > 0) {
                    parsedText += `"${boardCol[i].message}"`;
                }
            }
            if (boardCols.length !== index + 1) {
                parsedText += ',';
            }
        })
        parsedText += "\n";
    }
    return [boardTitle, parsedText];
}

exports.importCsv = importCsv;