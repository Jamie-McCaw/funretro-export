const fs = require('fs');
const path = require('path');
const { handleError } = require('./error.js');
const { importTxt } = require('./text.js')
const { importCsv } = require('./csv.js')

const exportTxt = (url, filePath) => {
    importTxt(url)
        .then(data => {
            const resolvedPath = path.resolve(filePath || `../${data.split('\n')[0].replace('/', '')}.txt`);
            fs.writeFile(resolvedPath, data, (error) => {
                if (error) {
                    throw error;
                } else {
                    console.log(`Successfully written to file at: ${resolvedPath}`);
                }
                process.exit()
            });
        })
        .catch(error => {
            handleError(error);
        })
}

const exportCsv = (url, filePath) => {
    importCsv(url)
        .then((title, data) => {
            console.log(data)
                // need to set title as resolved path
            fs.writeFile(resolvedPath, data, (error) => {
                if (error) {
                    throw error;
                } else {
                    console.log(`Successfully written to file at: ${resolvedPath}`);
                }
                process.exit()
            });
        })
        .catch(error => {
            handleError(error);
        })
}

exports.exportTxt = exportTxt;
exports.exportCsv = exportCsv;