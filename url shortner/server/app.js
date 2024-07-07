const express = require("express");
const morgan = require("morgan");
const app = express();
const cors=require('cors');
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`)); 

const urlSubmitRouter=require('./routers/urlSubmitRoute')
const urlGetRouter=require('./routers/urlGetRoute')
const userRouter=require('./routers/userRoute')

app.use((req, res, next) => {
    req.requestTime = new Date();
    next();
});
app.get('/hi', (req, res, next) => {
    console.log("sajdfh");
    next();
});
app.use('/api/v1/urlSubmit',urlSubmitRouter)
app.use('/api/v1/getUrl',urlGetRouter)
app.use('/api/v1/user',userRouter)
module.exports = app;
