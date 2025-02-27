const express = require('express');
const userRouter = require('./Routes/user');
const { ConnectMDB } = require('./ConnectionMDB')
const { logReqRes } = require('./Middlewares/index')


const app = express();
const PORT = 3000;


//Connecting

ConnectMDB('mongodb://localhost:27017/My-DATA-BASE').then(()=>{
    console.log('MomgoDB Connected')
});

//MIDDLEWARE PLUGIN

app.use(express.urlencoded({ extended: false }));

app.use(logReqRes('log.txt'));

//Routes

app.use('/api/users', userRouter)

app.listen(PORT, () => {
    console.log(`Server started at PORT : ${PORT}`);
})