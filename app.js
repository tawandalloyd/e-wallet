const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./src/routes/userRouter');
const accountRouter = require('./src/routes/accountRouter');

const app = express();

app.use(express.json());

app.use((req,res,next) =>{
    console.log("hello from middleware");
    next();
})

app.get("/",(req,res)=>{
    res.send("<h2>Hello there..Chucks<h2/>")
});

mongoose
.connect("mongodb://tawanda:6209lolo@mongo:27017?authSource=admin")
.then(()=> console.log(" db successfully connected"))
.catch((e)=> console.log(e));


const port = process.env.PORT || 3000;



app.listen(port, ()=> console.log(`listening on Port ${port}`));
app.use('/api/v1/users',accountRouter);
app.use('/api/v1/users',userRouter);
module.exports = app;