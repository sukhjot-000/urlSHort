const dotenv = require('dotenv');
dotenv.config({ path: './cofig.env' });
const mongoose = require("mongoose");

const app = require("./app");


const DB =process.env.DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("connected to db") ;
  });

const port = process.env.PORT||3000;

app.listen(port,()=>{
    console.log('server is running at',port)
})