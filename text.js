const fs = require('fs');

const writeTxt = (resolvedPath, data) => {
    fs.writeFile(resolvedPath, data, (error) => {
        if (error) {
            throw error;
        } else {
            console.log(`Successfully written to file at: ${resolvedPath}`);
        }
        process.exit()
    });
}

exports.writeTxt = writeTxt;