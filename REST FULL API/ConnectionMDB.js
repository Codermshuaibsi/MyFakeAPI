const mongoose = require('mongoose');

async function ConnectMDB(url) {
    return mongoose.connect(url);
}

module.exports={
    ConnectMDB,
}