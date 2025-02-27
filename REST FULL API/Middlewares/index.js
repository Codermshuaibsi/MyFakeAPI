const fs = require('fs');

function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(
            filename,
            `\nDate: ${Date.now()} : ${req.ip} : ${req.method} : ${req.url}`, (err) => {
                if (err) { console.log(err); }
                else {
                    next();
                }
            }
        )

    }
}

module.exports={
    logReqRes,
}