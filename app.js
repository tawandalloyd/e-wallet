const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get("/",(req,res)=>{
    res.send("<h2>Hello there tawanda..Chucks<h2/>")
});

mongoose
.connect("mongodb://tawanda:6209lolo@mongo:27017?authSource=admin")
.then(()=> console.log("successfully connected"))
.catch((e)=> console.log(e));


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on Port ${port}`));

